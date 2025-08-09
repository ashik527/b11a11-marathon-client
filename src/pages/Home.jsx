
import { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import MarathonCard from '../components/MarathonCard';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Home = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/marathons?limit=6`)
      .then(res => setMarathons(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-12">
      <Banner />

      {/* Section 1: Marathons from DB */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Featured Marathon</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map(marathon => (
            <MarathonCard key={marathon._id} marathon={marathon} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/marathons" className="btn btn-primary">See All Marathons</Link>
        </div>
      </section>

      {/* Section 2: Upcoming Marathons (static) */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Upcoming Marathons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="card bg-green-100 shadow-xl p-4">
              <h3 className="text-xl font-semibold">Spring Run {i + 1}</h3>
              <p>📍 Dhaka | 🗓️ July 2025</p>
              <p className="mt-2">Distance: 10K | Reg. Closes: July 10</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 1: Benefits */}
      <section className="bg-base-200 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Join a Marathon?</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Improve your fitness and mental health</li>
          <li>Challenge yourself with competitive goals</li>
          <li>Support charity and community events</li>
        </ul>
      </section>

      {/* Extra Section 2: Organize Your Own Event */}
      <section className="bg-base-200 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Want to Organize a Marathon?</h2>
        <p>
          You can create your own marathon events and manage registrations through your dashboard.
          Click below to get started!
        </p>
        <Link to="/add-marathon" className="btn btn-accent mt-4">Create Marathon</Link>
      </section>
    </div>
  );
};

export default Home;
