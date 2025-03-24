import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthComponent } from "./Auth/AuthComponent";
import { Header } from "./components/Header";
import { SidebarComponent } from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { EmployeesManagementComponent } from "./EmployeesManagement/EmployeesManagementComponent";
import { DashboardScreen } from "./routes/DashboardScreen";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AuthComponent/>}/>
        <Route path="/dashboard" element={<DashboardScreen/>}/>
      </Routes>
    </>
  );
}

export default App;
