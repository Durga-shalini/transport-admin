import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        if (!username || !password) return toast.error("Enter all fields");
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/admin/login", { username, password });
            console.log("reserer", res)
            localStorage.setItem("token", res.data.token);
            navigate("/");
            toast.success("Login successful");


        } catch (err) {
            toast.error(err.response?.data || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-white p-4 rounded shadow" style={{ width: "320px" }}>
                <h4 className="text-center mb-3">Admin Login</h4>
                <input
                    className="form-control mb-2"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="btn btn-primary w-100" onClick={login} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}