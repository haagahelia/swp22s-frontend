
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({
    children,
    redirectPath,
    isAllowed,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };