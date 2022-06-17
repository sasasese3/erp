import { createContext, useState } from "react";
import { ROLES } from "../utils/roles";

type Auth = {
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  role?: string;
};
type AuthContextType = {
  auth?: Auth;
  setAuth?: Function;
};

type Props = {
  children: JSX.Element;
};

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
