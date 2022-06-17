import { Flex, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
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
        setTimeout(() => setShow(true), 500);
      } catch (error) {
        setTimeout(() => setShow(true), 500);
      }
    };
    fetchData();
  }, []);

  return !show ? (
    <>
      <LoadingPage></LoadingPage>
    </>
  ) : auth?.role && allowedRoles.includes(auth?.role) ? (
    <Flex direction={"column"} flex={1}>
      <NavBar></NavBar>
      <Outlet />
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
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
