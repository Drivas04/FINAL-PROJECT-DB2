import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const EventsArea = () => {
  const events = [
    {
      id: 1,
      nombre: "Capacitación en Liderazgo",
      fecha: "2025-04-10",
      ubicacion: "Sala A",
    },
    {
      id: 2,
      nombre: "Evaluación de Desempeño",
      fecha: "2025-04-15",
      ubicacion: "Oficinas RRHH",
    },
    {
      id: 3,
      nombre: "Feria de Bienestar",
      fecha: "2025-04-20",
      ubicacion: "Patio Central",
    },
    {
      id: 4,
      nombre: "Actualización de Seguridad",
      fecha: "2025-04-25",
      ubicacion: "Sala B",
    },
    {
      id: 5,
      nombre: "Fiesta de Fin de Mes",
      fecha: "2025-04-30",
      ubicacion: "Comedor",
    },
    {
      id: 6,
      nombre: "Curso de Excel Avanzado",
      fecha: "2025-05-05",
      ubicacion: "Sala C",
    },
    {
      id: 7,
      nombre: "Inducción Nuevos Empleados",
      fecha: "2025-05-08",
      ubicacion: "Auditorio",
    },
    {
      id: 8,
      nombre: "Jornada de Salud Ocupacional",
      fecha: "2025-05-12",
      ubicacion: "Sala de Conferencias",
    },
    {
      id: 9,
      nombre: "Reunión de Planeación Estratégica",
      fecha: "2025-05-18",
      ubicacion: "Oficina de Gerencia",
    },
    {
      id: 10,
      nombre: "Taller de Trabajo en Equipo",
      fecha: "2025-05-22",
      ubicacion: "Sala D",
    },
  ];

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )

  return (
    <Card className=" border rounded-lg shadow-md">
      <div className="p-4">
        <CardTitle>
          <h1 className="text-violet-600 text-4xl font-semibold">
            Empleados Activos
          </h1>
        </CardTitle>
        <br />
        <hr />
        <ScrollArea className="h-72 w-full rounded-md border">
          <div className="p-4">
            {events.map((event) => {
              return(
              <div key={event.id}>
                <div className="text-sm">
                  {event.nombre}
                </div>
                <Separator className="my-2" />
              </div>
            )})}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};
