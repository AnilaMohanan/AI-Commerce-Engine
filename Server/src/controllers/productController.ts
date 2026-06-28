import { Request, Response } from "express";
import Product from "../models/Product";
import redisClient from "../config/redis";
import { generateEmbedding } from "../services/embeddingService";

export const getProducts = async (req: any, res: any) => {
  try {
    const cachedProducts = await redisClient.get("products:all");

    if (cachedProducts) {
      console.log("Serving from Redis Cache");
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find();

await redisClient.setEx(
  "products:all",
  3600,
  JSON.stringify(products)
);
    console.log("Serving from MongoDB");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
    export const updateProduct = async (req: any, res: any) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);

    await redisClient.del("products:all");

    res.json({ message: "Product updated and cache cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });

  }
};
export const deleteProduct = async (req: any, res: any) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    await redisClient.del("products:all");

    res.json({
      message: "Product deleted and cache cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",});

  }
};
export const createProduct = async (req: any, res: any) => {
  try {
    const product = await Product.create(req.body);

    await redisClient.del("products:all");

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const searchProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      sort,
      page = "1",
      limit = "10",
      inStock,
    } = req.query;
// Create cache key 
const cacheKey = `search:${JSON.stringify(req.query)}`;
  // Check Redis
  const cachedData = await redisClient.get(cacheKey);

if (cachedData) {
  console.log("Serving search results from Redis");

  return res.status(200).json(JSON.parse(cachedData));
}

// If not found in Redis,continue with MongoDB
    const query: any = {};

    // Keyword Search
    if (keyword) {
      query.$or = [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Stock Filter
    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    let productQuery = Product.find(query);

    // Sorting
    if (sort) {
      productQuery = productQuery.sort(sort as string);
    } else {
      productQuery = productQuery.sort("-createdAt");
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const totalResults = await Product.countDocuments(query);

    const products = await productQuery
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
      const response = {
  success: true,
  message: "Products fetched successfully",
  data: {
    currentPage: pageNumber,
    totalPages: Math.ceil(totalResults / pageSize),
    totalResults,
    products,
  },
};

await redisClient.setEx(
  cacheKey,
  300,
  JSON.stringify(response)
);

console.log("Serving search results from MongoDB");

return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const vectorSearchProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const { query, category, maxPrice } = req.body;

    // Check if query is provided
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    // Redis Cache Key
    const cacheKey = `vector-search:${JSON.stringify(req.body)}`;

    // Check Redis Cache
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Serving vector search from Redis");

      return res.status(200).json(JSON.parse(cachedData));
    }

    // Generate Embedding
    const embedding = (await generateEmbedding(query)) as number[];

    console.log("Embedding Dimensions:", embedding.length);

    // Hybrid Filters
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (maxPrice) {
      filter.price = {
        $lte: Number(maxPrice),
      };
    }

    // MongoDB Vector Search
    const results = await Product.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embeddings",
          queryVector: embedding,
          numCandidates: 100,
          limit: 10,
          filter,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          category: 1,
          stock: 1,
          image: 1,
          score: {
            $meta: "vectorSearchScore",
          },
        },
      },
    ]);

    // Response
    const response = {
      success: true,
      message: "Vector search completed successfully",
      results,
    };

    // Save to Redis (5 minutes)
    await redisClient.setEx(
      cacheKey,
      300,
      JSON.stringify(response)
    );

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Vector search failed",
    });
  }
};