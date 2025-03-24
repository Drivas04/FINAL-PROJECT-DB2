import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const DashboardScreen = () => {
  const employees = [
    { id: 1, name: "Jaime Ruiz", status: true },
    { id: 2, name: "Mariana López", status: false },
    { id: 3, name: "Carlos Fernández", status: true },
    { id: 4, name: "Sofía Ramírez", status: false },
    { id: 5, name: "Ricardo Gómez", status: true },
    { id: 6, name: "Fernanda Torres", status: false },
    { id: 7, name: "Alejandro Morales", status: true },
    { id: 8, name: "Valeria Mendoza", status: false },
    { id: 9, name: "Juan Pérez", status: true },
    { id: 10, name: "Andrea Herrera", status: false },
    { id: 11, name: "Pedro Castillo", status: true },
    { id: 12, name: "Camila Rojas", status: false },
    { id: 13, name: "Francisco Ortega", status: true },
    { id: 14, name: "Isabela Duarte", status: false },
    { id: 15, name: "Diego Vargas", status: true },
    { id: 16, name: "Lucía Estrada", status: false },
    { id: 17, name: "Emilio Sánchez", status: true },
    { id: 18, name: "Paola Gutiérrez", status: false },
    { id: 19, name: "José Ramírez", status: true },
    { id: 20, name: "Natalia Suárez", status: false },
  ];

  const requests = [
    { id: 1, requestType: "Vacaciones", request_employee: "Jaime Ruiz" },
    {
      id: 2,
      requestType: "Permiso Médico",
      request_employee: "Carlos Fernández",
    },
    { id: 3, requestType: "Día Personal", request_employee: "Ricardo Gómez" },
    { id: 4, requestType: "Vacaciones", request_employee: "Alejandro Morales" },
    { id: 5, requestType: "Trabajo Remoto", request_employee: "Juan Pérez" },
    {
      id: 6,
      requestType: "Licencia por Estudio",
      request_employee: "Pedro Castillo",
    },
    {
      id: 7,
      requestType: "Permiso Especial",
      request_employee: "Francisco Ortega",
    },
    {
      id: 8,
      requestType: "Día de Compensación",
      request_employee: "Diego Vargas",
    },
    { id: 9, requestType: "Vacaciones", request_employee: "Emilio Sánchez" },
    {
      id: 10,
      requestType: "Licencia por Luto",
      request_employee: "José Ramírez",
    },
  ];

  return (
    <main className="pl-28 pt-10 pr-14 pb-12">
      <div className="grid grid-cols-2 grid-rows-4 gap-4">
        <Card className="row-span-2 border rounded-lg shadow-md flex justify-center p-6">
          <CardContent className="grid grid-cols-2 grid-rows-2 gap-1.5">
            <div>
              <Label htmlFor="email">Id del empleado</Label>
            </div>
            <div className="row-span-2 content-end">
              <Button type="submit">Buscar</Button>
            </div>
            <div>
              <Input type="text" name="id" placeholder="Id del empleado" />
            </div>
          </CardContent>
        </Card>
        <Card className="row-span-3 border rounded-lg shadow-md">

          <div className="p-4">
            <CardTitle>
              <h1 className="text-violet-600 text-4xl font-semibold">
                Empleados Activos
              </h1>
            </CardTitle>
            <br />
            <hr />
            <ScrollArea className="h-full w-full rounded-md border ">
              <ul className="pt-4 pl-4">
                {employees.map((emp) => {
                  return (<><li key={emp.id}>{emp.status && emp.name}</li><Separator className="my-2" /></>);
                })}
              </ul>
            </ScrollArea>
          </div>
        </Card>
        <Card className="row-span-2 row-start-3 border rounded-lg shadow-md">
          <div className="p-4">
            <CardTitle>
              <h1 className="text-violet-600 text-4xl font-semibold">
                Solicitudes pendientes
              </h1>
            </CardTitle>
            <br />
            <hr />
            <CardContent>
              <ul className="pt-4 pl-4">
                {requests.map((req) => {
                  return (
                    <>
                      <li>{req.requestType}</li>
                      <hr />
                    </>
                  );
                })}
              </ul>
            </CardContent>
          </div>
        </Card>
        <div className="col-start-2 row-start-4 border rounded-lg shadow-md">
          Eventos
        </div>
      </div>
    </main>
  );
};
