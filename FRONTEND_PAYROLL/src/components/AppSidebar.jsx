import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const path = location.pathname;

  let items = [];

  if (path.startsWith("/empleados")) {
    items = [
      { label: "Listado", path: "/empleados" },
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
