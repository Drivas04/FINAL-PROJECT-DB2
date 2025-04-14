import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { format, set } from "date-fns";
import { es } from "date-fns/locale";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { EditProfileComponent } from "./EditProfileComponent";
import { department } from "@/data/department";
import { useDataContext } from "@/context/DataContext";

export const EmployeesTable = () => {
  const { employees, updateEmployee } = useDataContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getDepartmentName = (department_id) => {
    return department.find((dept) => dept.id_departamento === department_id)
      .nombre;
  };

  /*
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/empleados");
        const data = await response.json();
        setEmps(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();

  }, []);
  */

  return (
    <>
      <div className="overflow-x-auto container mx-auto mt-5">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Empleados</h1>
        </div>
      </div>
      <Table className="w-full border-collapse border border-slate-300">
        <TableCaption>
          Lista de todos los empleados activos en la empresa
        </TableCaption>
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
          {employees.map((emp) => {
            return (
              <TableRow key={emp.id_empleado}>
                <TableCell className="text-center">{emp.documento}</TableCell>
                <TableCell className="text-center">
                  {emp.tipo_documento}
                </TableCell>
                <TableCell className="text-center">{emp.nombre}</TableCell>
                <TableCell className="text-center">
                  {format(new Date(emp.fecha_nacimiento), "d-MM-yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell className="text-center">{emp.telefono}</TableCell>
                <TableCell className="text-center">{emp.correo}</TableCell>
                <TableCell className="text-center">
                  {format(new Date(emp.fecha_contratacion), "d-MM-yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {getDepartmentName(emp.id_departamento)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <HiEllipsisHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Ver contrato</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setIsDialogOpen(true);
                            setSelectedEmployee(emp);
                          }}
                        >
                          Editar perfil
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
          {selectedEmployee && (
            <EditProfileComponent
              open={isDialogOpen}
              setOpen={setIsDialogOpen}
              employee={selectedEmployee}
              departmentName={getDepartmentName(
                selectedEmployee.id_departamento
              )}
              onUpdateEmployee={updateEmployee}
            />
          )}
        </TableBody>
      </Table>
    </>
  );
};
