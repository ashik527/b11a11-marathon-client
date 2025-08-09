// src/components/MarathonCard.jsx
import { Link } from 'react-router-dom';

const MarathonCard = ({ marathon }) => {
  const {
    _id,
    title,
    location,
    image,
    registrationStart,
    registrationEnd
  } = marathon;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition">
      <figure>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">📍 {location}</p>
        <p className="text-sm">🗓️ Reg: {registrationStart} – {registrationEnd}</p>
        <div className="card-actions justify-end mt-2">
          <Link to={`/marathon/${_id}`} className="btn btn-sm btn-primary">See Details</Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonCard;
