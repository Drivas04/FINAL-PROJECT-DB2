import { employees } from "@/data/employees";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const ActiveEmployeesArea = () => {
  const emps = employees;
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
        <ScrollArea className="h-full w-full rounded-md border ">
          <ul className="pt-4 pl-4">
            {emps.map((emp) => {
              return (
                <div key={emp.id_empleado}>
                  <li>{emp.nombre}</li>
                  <Separator className="my-2" />
                </div>
              );
            })}
          </ul>
        </ScrollArea>
      </div>
    </Card>
  );
};
