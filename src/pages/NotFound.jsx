import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4">
      <h1 className="text-7xl font-bold text-error mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-500">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </section>
  );
};

export default NotFound;
