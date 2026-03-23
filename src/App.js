import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageLoads from "./pages/ManageLoads";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getRole() {
  const t = localStorage.getItem("token");
  if (!t) return null;
  return JSON.parse(atob(t.split(".")[1])).role;
}

//  Layout 
function AdminLayout() {
  return (
    <div className="d-flex">

   
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/loads" element={<ManageLoads />} />
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default function App() {
  const token = localStorage.getItem("token");
  const role = getRole();

  return (
    <BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            !token ? (
              <Navigate to="/login" />
            ) : role !== "ADMIN" ? (
              <h3 className="text-center mt-5">Access Denied</h3>
            ) : (
              <AdminLayout />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}