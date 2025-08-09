// src/pages/Marathons.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import MarathonCard from '../components/MarathonCard';
import Spinner from '../components/Spinner';

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/marathons`)
      .then(res => setMarathons(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-center">All Marathons</h2>

      {marathons.length === 0 ? (
        <p className="text-center text-gray-500">No marathons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map(marathon => (
            <MarathonCard key={marathon._id} marathon={marathon} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Marathons;
