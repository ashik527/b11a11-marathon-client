// src/pages/MyApplies.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import UpdateApplyModal from '../components/UpdateApplyModal';

const MyApplies = () => {
  const { user } = useContext(AuthContext);
  const [applies, setApplies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedApply, setSelectedApply] = useState(null);

  const fetchApplies = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/registrations/my-applies?email=${user.email}`)
      .then(res => {
        setApplies(res.data);
        setFiltered(res.data);
      })
      .catch(err => toast.error(`Application failed: ${err.message}`))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplies();
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this registration?');
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/registrations/${id}`);
      toast.success('Registration removed');
      fetchApplies();
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredList = applies.filter(apply =>
      apply.marathonTitle.toLowerCase().includes(value)
    );
    setFiltered(filteredList);
  };

  if (loading) return <Spinner />;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-center">My Applied Marathons</h2>

      <div className="mb-4 max-w-sm mx-auto">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title..."
          className="input input-bordered w-full"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Marathon</th>
                <th>Start Date</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apply, idx) => (
                <tr key={apply._id}>
                  <td>{idx + 1}</td>
                  <td>{apply.marathonTitle}</td>
                  <td>{apply.marathonStartDate}</td>
                  <td>{apply.contact}</td>
                  <td className="space-x-2">
                    <button onClick={() => setSelectedApply(apply)} className="btn btn-sm btn-info">Update</button>
                    <button onClick={() => handleDelete(apply._id)} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {selectedApply && (
        <UpdateApplyModal
          apply={selectedApply}
          onClose={() => setSelectedApply(null)}
          refetch={fetchApplies}
        />
      )}
    </section>
  );
};

export default MyApplies;
