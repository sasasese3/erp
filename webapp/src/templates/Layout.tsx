import { Outlet } from "react-router-dom";

function LayoutPage() {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

export default LayoutPage;
