import React from "react";
import { Button } from "@/components/ui/button";
import { HiMenu } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export const SidebarComponent = () => {
  const items = [
    {
      name: "Gestion de empleados",
      url: "#",
    },
    {
      name: "Liquidacion de nomina",
      url: "#",
    },
    {
      name: "Liquidacion de cesantias",
      url: "#",
    },
    {
      name: "Liquidacion de seguridad social",
      url: "#",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-4">
          <HiMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader className="mb-8">
          <SheetTitle>Acciones</SheetTitle>
        </SheetHeader>

        <ul className="flex flex-col gap-6">
          {items.map((item) => {
            return (
              <li key={item.name}>
                <Link>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
