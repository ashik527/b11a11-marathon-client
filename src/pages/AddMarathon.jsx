// src/pages/AddMarathon.jsx
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMarathon = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const [regStartDate, setRegStartDate] = useState(null);
  const [regEndDate, setRegEndDate] = useState(null);
  const [marathonDate, setMarathonDate] = useState(null);

  const onSubmit = async (data) => {
    if (!regStartDate || !regEndDate || !marathonDate) {
      return toast.error('Please select all dates');
    }

    const newMarathon = {
      title: data.title,
      registrationStart: regStartDate.toISOString().split('T')[0],
      registrationEnd: regEndDate.toISOString().split('T')[0],
      startDate: marathonDate.toISOString().split('T')[0],
      location: data.location,
      distance: data.distance,
      description: data.description,
      image: data.image,
      registrationCount: 0,
      createdAt: new Date().toISOString(),
      createdBy: {
        name: user.displayName,
        email: user.email,
      },
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/marathons`, newMarathon);
      toast.success('Marathon created!');
      reset();
      setRegStartDate(null);
      setRegEndDate(null);
      setMarathonDate(null);
      navigate('/dashboard/my-marathons');
    } catch (err) {
      toast.error(`Marathon creation failed: ${err.message}`);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add a New Marathon</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register('title', { required: true })} type="text" placeholder="Marathon Title" className="input input-bordered w-full" />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="label">Registration Start Date</label>
            <DatePicker
              selected={regStartDate}
              onChange={(date) => setRegStartDate(date)}
              className="input input-bordered w-full"
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex-1">
            <label className="label">Registration End Date</label>
            <DatePicker
              selected={regEndDate}
              onChange={(date) => setRegEndDate(date)}
              className="input input-bordered w-full"
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        <div>
          <label className="label">Marathon Start Date</label>
          <DatePicker
            selected={marathonDate}
            onChange={(date) => setMarathonDate(date)}
            className="input input-bordered w-full"
            placeholderText="Start Date"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <input {...register('location', { required: true })} type="text" placeholder="Location" className="input input-bordered w-full" />

        <div>
          <label className="label">Running Distance</label>
          <select {...register('distance')} className="select select-bordered w-full">
            <option value="3K">3K</option>
            <option value="10K">10K</option>
            <option value="25K">25K</option>
          </select>
        </div>

        <textarea {...register('description', { required: true })} placeholder="Marathon Description" className="textarea textarea-bordered w-full" rows={4}></textarea>

        <input {...register('image', { required: true })} type="url" placeholder="Image URL" className="input input-bordered w-full" />

        <button type="submit" className="btn btn-primary w-full">Create Marathon</button>
      </form>
    </section>
  );
};

export default AddMarathon;
