export default function Navbar() {
  return (
    <div className="p-3 bg-white shadow-sm d-flex justify-content-between">
      <h5>Admin Panel</h5>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >Logout</button>
    </div>
  );
}