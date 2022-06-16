import { Route, Routes } from "react-router-dom";
import LayoutPage from "./templates/Layout";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./templates/RequireAuth";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import InspectorPage from "./pages/InspectorPage";
import { ROLES } from "./utils/roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        {/* public routes */}
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="register" element={<LoginPage />}></Route>

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.EMPLOYEE]} />}>
          <Route path="home" element={<HomePage />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.INSPECTOR]} />}>
          <Route path="inspector" element={<InspectorPage />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="admin" element={<AdminPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
