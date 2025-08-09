import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import app from '../firebase.config';

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Google login successful');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email')} type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input {...register('password')} type="password" placeholder="Password" className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Don't have an account? <Link to="/register" className="link">Register</Link>
      </p>
      <div className="divider">OR</div>
      <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
        Continue with Google
      </button>
    </section>
  );
};

export default Login;
