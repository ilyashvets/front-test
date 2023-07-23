import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';

function Protected() {
  const location = useLocation();

  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default Protected;
