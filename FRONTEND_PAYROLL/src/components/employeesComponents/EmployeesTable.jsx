import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { employees } from "@/data/employees";
import { department } from "@/data/department";

export const EmployeesTable = () => {
  const [emps, setEmps] = useState(employees);

  const getDepartmentName = (department_id) => {
    let department = department.find((dep) => department_id === dep.id_departamento)
    let departmentName 
  }

  return (
    <Table>
      <TableCaption>Lista de todos los empleados activos en la empresa</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nro. de documento</TableHead>
          <TableHead className="text-center">Tipo de documento</TableHead>
          <TableHead className="text-center">Nombres</TableHead>
          <TableHead className="text-center">Fecha de nacimiento</TableHead>
          <TableHead className="text-center">Telefono</TableHead>
          <TableHead className="text-center">Correo</TableHead>
          <TableHead className="text-center">Fecha de contratación</TableHead>
          <TableHead className="text-center">Departamento</TableHead>
          <TableHead className="text-center">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emps.map((emp) => {
          return (
            <TableRow key={emp.id_empleado}>
              <TableCell className="text-center">{emp.documento}</TableCell>
              <TableCell className="text-center">
                {emp.tipo_documento}
              </TableCell>
              <TableCell className="text-center">{emp.nombre}</TableCell>
              <TableCell className="text-center">
                {emp.fecha_nacimiento}
              </TableCell>
              <TableCell className="text-center">{emp.telefono}</TableCell>
              <TableCell className="text-center">{emp.correo}</TableCell>
              <TableCell className="text-center">
                {emp.fecha_contratacion}
              </TableCell>
              <TableCell className="text-center">
                {emp.id_departamento}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost"><HiEllipsisHorizontal /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Ver contrato
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Editar información
                      </DropdownMenuItem>
                      <DropdownMenuItem className="!text-red-600 hover:!text-white hover:!bg-red-600">
                        Dar de baja
                      </DropdownMenuItem>
                      </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
