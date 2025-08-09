// src/components/Navbar.jsx
import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logout successful');
      navigate('/');
    } catch (err) {
      toast.error(`Logout failed: ${err.message}`);
    }
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className="px-3 py-2">Home</NavLink></li>
      <li><NavLink to="/marathons" className="px-3 py-2">Marathons</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-marathon">Add Marathon</NavLink></li>
          <li><NavLink to="/dashboard/my-marathons">Dashboard</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-yellow-100 shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <Link to="/" className="text-3xl font-bold text-green-700">🏃 Marathon Manager</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {user.photoURL
                    ? <img src={user.photoURL} className="w-full rounded-full" />
                    : user.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              </label>
              <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-56">
                <li className="mb-2">
                  <span className="font-semibold">{user.displayName || 'User'}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-sm btn-error w-full">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline mx-1">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
