import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthComponent } from "./Auth/AuthComponent";
import { Header } from "./components/Header";
import { EmployeesScreen } from "./routes/EmployeesScreen";
import { DashboardScreen } from "./routes/DashboardScreen";
import { PayrollScreen } from "./routes/PayrollScreen";
import { NewsScreen } from "./routes/NewsScreen";
import { SidebarComponent } from "./components/Sidebar";
import { Toaster } from "./components/ui/toaster";
import { ContractsScreen } from "./routes/ContractsScreen";
import { NewContractScreen } from "./routes/NewContractScreen";
import { DataProvider } from "./context/DataContext";
import { SeveranceDepositScreen } from "./routes/SeveranceDepositScreen";
import { SeveranceWithdrawScreen } from "./routes/SeveranceWithdrawScreen";
import { Departments } from "./routes/Departments";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <DataProvider>
        <Header />
        <div className="flex h-[calc(100vh-101px)]">
          {!isAuthPage && <SidebarComponent />}
          <main className="flex-1 overflow-y-auto bg-gray-100 ">
            <Routes>
              <Route path="/" element={<AuthComponent />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/empleados" element={<EmployeesScreen />} />
              <Route path="/nomina" element={<PayrollScreen />} />
              <Route path="/nomina/:id" element={<PayrollScreen />} />
              <Route path="/nomina/:id/:mes" element={<PayrollScreen />} />
              <Route path="/deposito-cesantias" element={<SeveranceDepositScreen />} />
              <Route path="/retiro-cesantias" element={<SeveranceWithdrawScreen />} />
              <Route path="/novedades" element={<NewsScreen />} />
              <Route path="/contratos" element={<ContractsScreen />} />
              <Route path="/contratos/nuevo" element={<NewContractScreen />} />
              <Route path="/departamentos" element={<Departments/>} />
            </Routes>
          </main>
        </div>
        <Toaster />
    </DataProvider>
  );
}

export default App;
