
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import Marathons from '../pages/Marathons';
import AddMarathon from '../pages/AddMarathon';
import MarathonDetails from '../pages/MarathonDetails';
import MyMarathons from '../pages/MyMarathons';
import MyApplies from '../pages/MyApplies';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute';
import RegisterForm from '../pages/RegisterForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Private Routes */}
        <Route path="marathons" element={<PrivateRoute><Marathons /></PrivateRoute>} />
        <Route path="marathon/:id" element={<PrivateRoute><MarathonDetails /></PrivateRoute>} />
        <Route path="add-marathon" element={<PrivateRoute><AddMarathon /></PrivateRoute>} />
        <Route path="dashboard/my-marathons" element={<PrivateRoute><MyMarathons /></PrivateRoute>} />
        <Route path="dashboard/my-applies" element={<PrivateRoute><MyApplies /></PrivateRoute>} />
        <Route path="marathon/:id/register" element={<PrivateRoute><RegisterForm /></PrivateRoute>} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
