import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "./templates/Layout";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./templates/RequireAuth";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import { ROLES } from "./utils/roles";
import EmployeePage from "./pages/EmployeePage";
import LandingBuyPage from "./pages/LandingBuyPage";
import POPage from "./pages/POPage";
import RVPage from "./pages/RVPage";
import LandingSellPage from "./pages/LandingSellPage";
import PVPage from "./pages/PVPage";
import AP3Page from "./pages/AP3Page";
import IBPage from "./pages/IBPage";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";
import RegisterPage from "./pages/RegisterPage";
import ApprovePage from "./pages/ApprovePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.EMPLOYEE]} />}>
          <Route path="home" element={<EmployeePage />} />
          <Route path="buy" element={<LandingBuyPage />} />
          <Route path="buy/po" element={<POPage />} />
          <Route path="buy/rv" element={<RVPage />} />
          <Route path="sell" element={<LandingSellPage />} />
          <Route path="sell/pv" element={<PVPage />} />
          <Route path="sell/ap3" element={<AP3Page />} />
          <Route path="ib" element={<IBPage />} />
        </Route>

        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.EMPLOYEE, ROLES.INSPECTOR]} />
          }
        >
          <Route path="history" element={<HistoryPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.INSPECTOR]} />}>
          <Route path="approve" element={<ApprovePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.EMPLOYEE, ROLES.INSPECTOR, ROLES.ADMIN]}
            />
          }
        >
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
