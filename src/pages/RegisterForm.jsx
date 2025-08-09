// src/pages/RegisterForm.jsx
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { state } = useLocation(); // contains marathon data from details page
  const navigate = useNavigate();

  const {
    title,
    startDate
  } = state?.marathon || {};

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const registrationData = {
      userEmail: user.email,
      marathonId: id,
      marathonTitle: title,
      marathonStartDate: startDate,
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      info: data.info,
      registeredAt: new Date().toISOString()
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/registrations`, registrationData);
      await axios.put(`${import.meta.env.VITE_API_URL}/marathons/${id}/increment`);
      toast.success('Registered successfully!');
      reset();
      navigate('/dashboard/my-applies');
    } catch (err) {
      toast.error(`Logout failed: ${err.message}`);
    }
  };

  if (!state?.marathon) return <p className="text-red-500 text-center">Invalid access</p>;

  return (
    <section className="max-w-xl mx-auto p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Register for {title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input value={user.email} disabled className="input input-bordered w-full" />
        <input value={title} disabled className="input input-bordered w-full" />
        <input value={startDate} disabled className="input input-bordered w-full" />

        <div className="flex gap-4">
          <input {...register('firstName', { required: true })} placeholder="First Name" className="input input-bordered w-full" />
          <input {...register('lastName', { required: true })} placeholder="Last Name" className="input input-bordered w-full" />
        </div>

        <input {...register('contact', { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />
        <textarea {...register('info')} placeholder="Additional Info (optional)" className="textarea textarea-bordered w-full" rows={3}></textarea>

        <button type="submit" className="btn btn-primary w-full">Submit Registration</button>
      </form>
    </section>
  );
};

export default RegisterForm;
