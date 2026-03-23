import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ManageLoads() {

  const [loads, setLoads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // 📦 Fetch loads
  useEffect(() => {
    api.get("/admin/loads")
      .then(res => setLoads(res.data))
      .catch(() => toast.error("Failed to fetch loads"));
  }, []);

  // ✅ Validation
  const validate = () => {
    if (!selected.origin) return "Origin is required";
    if (!selected.destination) return "Destination is required";
    if (!selected.date) return "Date is required";
    if (!selected.material) return "Material is required";
    if (!selected.weight) return "Weight is required";
    if (!selected.price) return "Price is required";
    return null;
  };

  // ❌ Delete
  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/load/${selected._id}`);
      setLoads(prev => prev.filter(l => l._id !== selected._id));
      toast.success("Deleted successfully");
      setShowDelete(false);
      setSelected(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✏️ Update
  const updateLoad = async () => {

    const error = validate();
    if (error) return toast.error(error);

    try {
      const res = await api.put(`/admin/load/${selected._id}`, selected);

      setLoads(prev =>
        prev.map(l => (l._id === selected._id ? res.data : l))
      );

      toast.success("Updated successfully");
      setShowEdit(false);
      setSelected(null);

    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">

      <h5 className="mb-3">🚛 Manage Loads</h5>

      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Route</th>
            <th>Date</th>
            <th>Material</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loads.map(l => (
            <tr key={l._id}>
              <td><b>{l.origin}</b> → <b>{l.destination}</b></td>
              <td>{l.date}</td>
              <td>{l.material}</td>
              <td>{l.weight} tons</td>
              <td className="text-success fw-bold">₹{l.price}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => {
                    setSelected(l);
                    setShowEdit(true);
                  }}
                >
                   Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setSelected(l);
                    setShowDelete(true);
                  }}
                >
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEdit && selected && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content p-4">

              <h5 className="mb-3"> Edit Load</h5>

              <label>Origin</label>
              <input
                className="form-control mb-2"
                value={selected.origin}
                onChange={e => setSelected({ ...selected, origin: e.target.value })}
              />

              <label>Destination</label>
              <input
                className="form-control mb-2"
                value={selected.destination}
                onChange={e => setSelected({ ...selected, destination: e.target.value })}
              />

              <label>Date</label>
              <input
                type="date"
                className="form-control mb-2"
                value={selected.date}
                onChange={e => setSelected({ ...selected, date: e.target.value })}
              />

              <label>Material</label>
              <input
                className="form-control mb-2"
                value={selected.material}
                onChange={e => setSelected({ ...selected, material: e.target.value })}
              />

              <label>Weight (tons)</label>
              <input
                className="form-control mb-2"
                value={selected.weight}
                onChange={e =>
                  setSelected({
                    ...selected,
                    weight: e.target.value.replace(/\D/g, "")
                  })
                }
              />

              <label>Price (₹)</label>
              <input
                className="form-control mb-3"
                value={selected.price}
                onChange={e =>
                  setSelected({
                    ...selected,
                    price: e.target.value.replace(/\D/g, "")
                  })
                }
              />

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setShowEdit(false);
                    setSelected(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={updateLoad}
                >
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {showDelete && selected && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content p-4 text-center">

              <h5>Are you sure? </h5>
              <p>
                Delete load <b>{selected.origin} → {selected.destination}</b> ?
              </p>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setShowDelete(false);
                    setSelected(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}