
import './App.css'

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDynamicTitle } from './utils/setTitle';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    setDynamicTitle(location.pathname);
  }, [location]);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
