import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "230px",
      background: "#0f172a",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h4>Admin</h4>
      <hr />
      <Link to="/" className="d-block text-white mb-3">Dashboard</Link>
      <Link to="/users" className="d-block text-white mb-3">Users</Link>
      <Link to="/loads" className="d-block text-white mb-3">Loads</Link>
    </div>
  );
}
