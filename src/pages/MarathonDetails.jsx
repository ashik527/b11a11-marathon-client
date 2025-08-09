// src/pages/MarathonDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { toast } from 'react-toastify';

const MarathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/marathons/${id}`)
      .then(res => setMarathon(res.data))
      .catch(err => toast.error(`Failed to load marathon details: ${err.message}`))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!marathon) return <p className="text-center text-red-500">Marathon not found</p>;

  const {
    title,
    image,
    location,
    description,
    distance,
    registrationStart,
    registrationEnd,
    startDate,
    registrationCount
  } = marathon;

  const today = new Date();
  const regStart = new Date(registrationStart);
  const regEnd = new Date(registrationEnd);
  const marathonStart = new Date(startDate);

  const isRegistrationOpen = today >= regStart && today <= regEnd;

  const startTime = Math.floor((marathonStart - today) / 1000); // in seconds

  const handleRegister = () => {
    if (!isRegistrationOpen) {
      toast.error('Registration period is closed.');
      return;
    }
    navigate(`/marathon/${id}/register`, { state: { marathon } });
  };

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-600">📍 {location} | 🏃 Distance: {distance}</p>
      <p className="text-sm text-gray-500">Registration: {registrationStart} → {registrationEnd}</p>
      <p className="text-sm text-gray-500">Start Date: {startDate}</p>
      <p className="text-lg mt-4">{description}</p>

      <div className="mt-4">
        <h4 className="text-md font-semibold">Total Registrations: {registrationCount || 0}</h4>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">⏳ Countdown to Marathon</h3>
        <CountdownCircleTimer
          isPlaying
          duration={startTime > 0 ? startTime : 1}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[3600 * 24 * 3, 3600 * 24, 3600, 0]}
          size={160}
        >
          {({ remainingTime }) => {
            const days = Math.floor(remainingTime / (3600 * 24));
            const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            return (
              <div className="text-center text-sm">
                <p>{days}d {hours}h {minutes}m</p>
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>

      <div className="mt-6">
        <button
          className={`btn ${isRegistrationOpen ? 'btn-primary' : 'btn-disabled'}`}
          onClick={handleRegister}
        >
          {isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
        </button>
      </div>
    </section>
  );
};

export default MarathonDetails;
