import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import { BasePathByRole } from "../utils/roles";

type Props = {
  allowedRoles: string[];
};

function RequireAuth({ allowedRoles }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/employee");
        const { data } = response.data;
        setAuth?.(data);
        setShow(true);
      } catch (error) {
        setShow(true);
      }
    };
    fetchData();
  }, []);

  return !show ? (
    <div> Loading</div>
  ) : auth?.role && allowedRoles.includes(auth?.role) ? (
    <>
      <NavBar></NavBar>
      <Outlet />
    </>
  ) : auth?.role ? (
    <Navigate
      to={
        BasePathByRole[auth.role as keyof typeof BasePathByRole].from.pathname
      }
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
