// src/pages/MyMarathons.jsx
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import UpdateMarathonModal from '../components/UpdateMarathonModal';
import { Link } from 'react-router-dom';

const MyMarathons = () => {
  const { user } = useContext(AuthContext);
  const [myMarathons, setMyMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarathon, setSelectedMarathon] = useState(null);

  const fetchMyMarathons = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/marathons/my-marathons?email=${user.email}`)
      .then(res => setMyMarathons(res.data))
      .catch(err => toast.error(`Loading failed: ${err.message}`))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyMarathons();
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this marathon?');
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/marathons/${id}`);
      toast.success('Marathon deleted');
      fetchMyMarathons();
    } catch (err) {
      toast.error(`Failed to delete: ${err.message}`);
    }
  };

  const handleUpdate = (marathon) => {
    setSelectedMarathon(marathon);
  };

  if (loading) return <Spinner />;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-center">My Created Marathons</h2>

      {myMarathons.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any marathons yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Registrations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myMarathons.map((marathon, index) => (
                <tr key={marathon._id}>
                  <td>{index + 1}</td>
                  <td>{marathon.title}</td>
                  <td>{marathon.location}</td>
                  <td>{marathon.startDate}</td>
                  <td>{marathon.registrationCount || 0}</td>
                  <td className="space-x-2">
                    <button onClick={() => handleUpdate(marathon)} className="btn btn-sm btn-info">Update</button>
                    <button onClick={() => handleDelete(marathon._id)} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     
      <div className="mt-8 text-center">
        <Link to="/dashboard/my-applies" className="btn btn-primary">
          View My Applied Marathons
        </Link>
      </div>

      {/* Update Modal */}
      {selectedMarathon && (
        <UpdateMarathonModal
          marathon={selectedMarathon}
          refetch={fetchMyMarathons}
          onClose={() => setSelectedMarathon(null)}
        />
      )}
    </section>
  );
};

export default MyMarathons;
