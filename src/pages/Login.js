import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Mobile validation
    const validateMobile = () => {
        if (!mobile) return "Mobile number is required";
        if (!/^[6-9]\d{9}$/.test(mobile))
            return "Enter valid 10-digit mobile number";
        return null;
    };

    //  OTP validation
    const validateOtp = () => {
        if (!otp) return "OTP is required";
        if (!/^\d{4,6}$/.test(otp))
            return "Enter valid OTP";
        return null;
    };

    //  Send OTP
    const sendOtp = async () => {
        const error = validateMobile();
        if (error) return toast.error(error);

        try {
            setLoading(true);

            await api.post("/auth/send-otp", { mobile, role: 'ADMIN' });

            toast.success("OTP Sent Successfully 📩");
            setStep(2);

        } catch (err) {
            toast.error(err.response?.data || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    //  Verify OTP
    const verifyOtp = async () => {
        const error = validateOtp();
        if (error) return toast.error(error);

        try {
            setLoading(true);

            const res = await api.post("/auth/verify-otp", { mobile, otp });
            console.log("resspn",res)

            localStorage.setItem("token", res.data.token);

            toast.success("Login Successful 🎉");
            navigate('/')

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data || "Invalid OTP ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">

            <div className="bg-white p-4 rounded shadow" style={{ width: "320px" }}>
                <h4 className="text-center mb-3">Admin Login</h4>

                {step === 1 && (
                    <>
                        <input
                            className="form-control mb-2"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-100"
                            onClick={sendOtp}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            className="form-control mb-2"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                        />

                        <button
                            className="btn btn-success w-100"
                            onClick={verifyOtp}
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}
            </div>

        </div>
    );
}