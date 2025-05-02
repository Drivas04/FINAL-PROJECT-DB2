import {
  ScrollText,
  UserPlus,
  Users,
  HandCoins,
  PiggyBank,
  Building,
  Home,
  Newspaper,
  List
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function SidebarComponent() {
  const location = useLocation();

  const path = location.pathname;
  let items = [];
  if (path.startsWith("/empleados")) {
    items = [
      { label: "Contratos", path: "/contratos", icon: <ScrollText /> },
      { label: "Departamentos", path: "/departamentos", icon: <Building /> },
    ];
  } else if (path.startsWith("/novedades")) {
    items = [
      { label: "Novedades", path: "/novedades" },
      { label: "Historial", path: "/novedades/historial" },
    ];
  } else if (path.startsWith("/contratos")) {
    items = [
      { label: "Empleados", path: "/empleados", icon: <Users /> },
      { label: "Nuevo Contrato", path: "/contratos/nuevo", icon: <UserPlus /> },
    ];
  } else if (path.startsWith("/deposito-cesantias") || path.startsWith("/retiro-cesantias")) {
    items = [
      {
        label: "Deposito de cesantias",
        path: "/deposito-cesantias",
        icon: <PiggyBank />,
      },
      {
        label: "Retiro de cesantias",
        path: "/retiro-cesantias",
        icon: <HandCoins />,
      },
      {
        label: "Retiros recientes",
        path: "/lista-retiros",
        icon: <List />,
      },
    ];
  }
  else if (path.startsWith("/departamentos")) {
    items = [
      { label: "Empleados", path: "/empleados", icon: <Users /> },
      { label: "Dashboard", path: "/dashboard", icon: <Home/> },
    ];
  }
  else if (path.startsWith("/nominas")) {
    items = [
      { label: "Empleados", path: "/empleados", icon: <Users /> },
      { label: "Dashboard", path: "/dashboard", icon: <Home/> },
      { label: "Novedades", path: "/novedades", icon: <Newspaper/> },
    ];
  }
  else if (path.startsWith("/seguridad-social")) {
    items = [
      { label: "Empleados", path: "/empleados", icon: <Users /> },
      { label: "Dashboard", path: "/dashboard", icon: <Home/> },
    ];
  } else {
    items = [
      { label: "Empleados", path: "/empleados", icon: <Users /> },
      { label: "Nominas", path: "/nominas", icon: <ScrollText /> },
      { label: "Deposito de cesantias", path: "/deposito-cesantias", icon: <PiggyBank /> },
      { label: "Retiro de cesantias", path: "/retiro-cesantias", icon: <HandCoins /> },
      { label: "Seguridad Social", path: "/seguridad-social", icon: <ScrollText /> },
      { label: "Novedades", path: "/novedades", icon: <ScrollText /> },
      { label: "Contratos", path: "/contratos", icon: <ScrollText /> },
      { label: "Departamentos", path: "/departamentos", icon: <Building /> },
    ];
  }

  return (
    <aside className="w-64 h-[calc(100vh-101px)] text-black bg-background flex flex-col p-4 border-r-2">
      <div className="text-2xl font-bold mb-8"></div>
      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            style={
              item.path === path
                ? "text-violet-600 font-semibold"
                : "text-gray-700 hover:text-violet-600"
            }
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, path, style}) {
  const navigate = useNavigate();
  const navigateOnClick = (path) => {
    navigate(path);
  };
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors"
      onClick={() => navigateOnClick(path)}
    >
      {icon}
      <span
        className={style}
      >
        {label}
      </span>
    </button>
  );
}
