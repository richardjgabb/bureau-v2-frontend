import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import NavBar from '../Molecules/NavBar/NavBar';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes (using Outlet)
  return (
    <>
        <NavBar />
        <Outlet />
    </>
  );
};

export default ProtectedRoute;