import "./App.css";
import { AuthComponent } from "./Auth/AuthComponent";
import { Header } from "./components/Header";
import { SidebarComponent } from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { EmployeesManagementComponent } from "./EmployeesManagement/EmployeesManagementComponent";

function App() {
  return (
    <>
      <Header />
      <AuthComponent />
      
    </>
  );
}

export default App;
