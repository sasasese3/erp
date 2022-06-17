import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import LayoutWithNav from "../components/LayoutWithNav";
import LoadingPage from "../pages/LoadingPage";
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
        setTimeout(() => setShow(true), 0.5 * 1000);
      } catch (error) {
        setTimeout(() => setShow(true), 0.5 * 1000);
      }
    };
    fetchData();
  }, []);
  return !show ? (
    <LoadingPage />
  ) : auth?.role && allowedRoles.includes(auth?.role) ? (
    <Flex direction="column">
      <NavBar />
      <LayoutWithNav>
        <Outlet />
      </LayoutWithNav>
    </Flex>
  ) : auth?.role ? (
    <Navigate
      to={
        BasePathByRole[auth.role as keyof typeof BasePathByRole].from.pathname
      }
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
