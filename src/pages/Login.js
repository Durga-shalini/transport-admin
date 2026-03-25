import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        if (!username || !password) return toast.error("Enter all fields");
        try {
            setLoading(true);
            const res = await axios.post("https://transport-backend-azhc.onrender.com/api/admin/login", { username, password });
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

                <div className="position-relative mb-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowPassword(prev => !prev)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            userSelect: "none",
                            fontSize: "1rem",
                            color: "#555"
                        }}
                    >
                        👁️
                    </span>
                </div>

                <button className="btn btn-primary w-100" onClick={login} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}