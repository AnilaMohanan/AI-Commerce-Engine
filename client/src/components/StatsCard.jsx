function StatsCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "220px",
        textAlign: "center",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

export default StatsCard;