import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, loads: 0 });

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="p-4 bg-white rounded shadow">
          <h6>Total Users</h6>
          <h2>{stats.users}</h2>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-4 bg-white rounded shadow">
          <h6>Total Loads</h6>
          <h2>{stats.loads}</h2>
        </div>
      </div>
    </div>
  );
}
