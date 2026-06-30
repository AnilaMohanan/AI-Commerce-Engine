import StatsCard from "../components/StatsCard";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <StatsCard title="Total Products" value="1000" />
        <StatsCard title="Categories" value="12" />
        <StatsCard title="Orders" value="250" />
      </div>
    </div>
  );
}

export default Dashboard;