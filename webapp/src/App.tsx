import { Route, Routes } from "react-router-dom";
import LayoutPage from "./templates/Layout";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./templates/RequireAuth";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import InspectorPage from "./pages/InspectorPage";
import { ROLES } from "./utils/roles";
import NavBar from "./components/NavBar";
import EmployeePage from "./pages/EmployeePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="register" element={<LoginPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.EMPLOYEE]} />}>
          <Route path="home" element={<EmployeePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.INSPECTOR]} />}>
          <Route path="inspector" element={<InspectorPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
