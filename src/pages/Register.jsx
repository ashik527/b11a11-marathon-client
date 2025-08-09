// src/pages/Register.jsx
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import app from '../firebase.config';

const Register = () => {
  const auth = getAuth(app);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ name, email, password, photoURL }) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegex.test(password)) {
      return toast.error('Password must have at least one uppercase, one lowercase, and be at least 6 characters.');
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name, photoURL });
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} type="text" placeholder="Full Name" className="input input-bordered w-full" required />
        <input {...register('email')} type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input {...register('photoURL')} type="url" placeholder="Photo URL" className="input input-bordered w-full" />
        <input {...register('password')} type="password" placeholder="Password" className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account? <Link to="/login" className="link">Login</Link>
      </p>
    </section>
  );
};

export default Register;
