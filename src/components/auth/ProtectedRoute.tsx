import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { user } = useAuth();
  
  // if (!user) {
    // User is not authenticated, redirect to login
    // return <Navigate to="/login" replace />;
  // }
  
  // User is authenticated, render children
  return <>{children}</>;
}

export default ProtectedRoute;