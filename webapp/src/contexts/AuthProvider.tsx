import { createContext, useState } from "react";
import { Employee } from "../utils/responseType";

type AuthContextType = {
  auth?: Employee;
  setAuth?: Function;
};

type Props = {
  children: JSX.Element;
};

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Employee>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
