import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthComponent } from "./Auth/AuthComponent";
import { Header } from "./components/Header";
import { EmployeesScreen } from "./routes/EmployeesScreen";
import { DashboardScreen } from "./routes/DashboardScreen";
import { PayrollScreen } from "./routes/PayrollScreen";
import { SeverancePayScreen } from "./routes/severancePayScreen";
import { NewsScreen } from "./routes/NewsScreen";
import { SidebarComponent } from "./components/Sidebar";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/dashboard';
  return (
    <>
      <Header />
      {!isAuthPage && (<SidebarComponent/>)}
      <Routes>
        <Route path="/" element={<AuthComponent/>}/>
        <Route path="/dashboard" element={<DashboardScreen/>}/>
        <Route path="/empleados" element={<EmployeesScreen/>}/>
        <Route path="/nomina" element={<PayrollScreen/>}/>
        <Route path="/liquidacion-nomina" element={<SeverancePayScreen/>}/>
        <Route path="/novedades" element={<NewsScreen/>}/>
      </Routes>
    </>
  );
}

export default App;
