import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react/jsx-dev-runtime';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  // Эгер колдонуучу али кире элек болсо, аны /welcome барагына багыттайбыз
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};