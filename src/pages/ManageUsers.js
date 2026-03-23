import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="bg-white p-3 rounded shadow">
      <h5>Users</h5>
      <table className="table">
        <thead>
          <tr><th>Mobile</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.mobile}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
