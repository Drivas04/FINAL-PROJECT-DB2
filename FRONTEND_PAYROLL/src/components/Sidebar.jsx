import { Home, ScrollText} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


export function SidebarComponent() {

  const location = useLocation();

 

  const path = location.pathname;
  let items = [];
  if (path.startsWith("/empleados")) {
    items = [
      { label: "Contratos", path: "/contratos", icon: <ScrollText /> },
      { label: "Agregar", path: "/empleados/nuevo" },
    ];
  } else if (path.startsWith("/nomina")) {
    items = [
      { label: "Resumen", path: "/nomina" },
      { label: "Liquidación", path: "/nomina/liquidacion" },
    ];
  } else if (path.startsWith("/novedades")) {
    items = [
      { label: "Novedades", path: "/novedades" },
      { label: "Historial", path: "/novedades/historial" },
    ];
  } else {
    items = [
      { label: "Dashboard", path: "/dashboard" },
    ];
  }

  return (
    <aside className="w-64 h-[calc(100vh-101px)] text-black bg-background flex flex-col p-4 border-r-2">
      <div className="text-2xl font-bold mb-8"></div>
      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <SidebarItem key={item.path} icon={item.icon} label={item.label} path={item.path}/>
        ))}

      </nav>
    </aside>
  );
}



function SidebarItem({ icon, label, path }) {
  const navigate = useNavigate();
  const navigateOnClick = (path) => {
    navigate(path);
  }
  return (
    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors" onClick={() => navigateOnClick(path)}>
      {icon}
      <span>{label}</span>
    </button>
  );
}