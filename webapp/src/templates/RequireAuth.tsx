import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BasePathByRole } from "../utils/roles";

type Props = {
  allowedRoles: string[];
};

function RequireAuth({ allowedRoles }: Props) {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.role && allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.role ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
