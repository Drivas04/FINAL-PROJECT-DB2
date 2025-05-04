import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDepartmentName } from "@/helpers/EmployeeHelper";
import usePagination from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { Input } from "../ui/input";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { useDepartmentContext } from "@/context/DepartmentsContext";
import { useToast } from "@/hooks/use-toast";

export const EmployeesTable = () => {
  const { employees, updateEmployee, deleteEmployee } = useEmployeeContext();
  const { departments } = useDepartmentContext();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const {
    search,
    setSearch,
    filteredData: filteredEmployees,
  } = useSearch(employees, "numeroDocumento");
  
  const { currentPage, maxPage, goToPage, paginatedData } = usePagination(
    filteredEmployees,
    5
  );

  const handleDeleteConfirm = async () => {
    try {
      if (employeeToDelete) {
        await deleteEmployee(employeeToDelete.idEmpleado);
        toast({
          title: "Empleado dado de baja",
          description: `${employeeToDelete.nombre} ha sido dado de baja exitosamente.`,
        });
        setIsDeleteDialogOpen(false);
        setEmployeeToDelete(null);
      }
    } catch (error) {
      console.error("Error al dar de baja al empleado:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo dar de baja al empleado. Intente nuevamente.",
      });
    }
  };

  return (
    <>
      <div className="overflow-x-auto container mx-auto mt-5">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Empleados</h1>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Buscar por numero de documento..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            goToPage(1);
          }}
          className="w-[300px]"
        />
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
            <TableHead className="text-center">Número de cuenta</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((emp) => {
            return (
              <TableRow key={emp.numeroDocumento}>
                <TableCell className="text-center">
                  {emp.numeroDocumento}
                </TableCell>
                <TableCell className="text-center">
                  {emp.tipoDocumento}
                </TableCell>
                <TableCell className="text-center">{emp.nombre}</TableCell>
                <TableCell className="text-center">
                  {format(new Date(emp.fechaNacimiento).setHours(24), "dd-MM-yyyy", {
                    locale: es, 
                  })}
                </TableCell>
                <TableCell className="text-center">{emp.telefono}</TableCell>
                <TableCell className="text-center">{emp.correo}</TableCell>
                <TableCell className="text-center">
                  {format(new Date(emp.fechaContratacion), "dd-MM-yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {getDepartmentName(
                    emp.departamentoIdDepartamento,
                    departments
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {emp.cuentabancariaNumeroCuenta}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button ref={dropdownRef} variant="ghost">
                        <HiEllipsisHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Ver contrato</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/empleados/${emp.idEmpleado}/nominas`)
                          }
                        >
                          Ver nóminas
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (dropdownRef.current) {
                              dropdownRef.current.click();
                            }

                            setTimeout(() => {
                              setIsDialogOpen(true);
                              setSelectedEmployee(emp);
                            }, 50);
                          }}
                        >
                          Editar perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="!text-red-600 hover:!text-white hover:!bg-red-600"
                          onClick={() => {
                            if (dropdownRef.current) {
                              dropdownRef.current.click();
                            }

                            setTimeout(() => {
                              setEmployeeToDelete(emp);
                              setIsDeleteDialogOpen(true);
                            }, 50);
                          }}
                        >
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
                selectedEmployee.departamentoIdDepartamento,
                departments
              )}
            />
          )}
        </TableBody>
      </Table>
      <div>
        <Button
          variant="ghost"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        <span>{`Página ${currentPage} de ${maxPage}`}</span>
        <Button
          variant="ghost"
          onClick={() => goToPage(currentPage + 1)}
          hidden={currentPage === maxPage}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Diálogo de confirmación para dar de baja */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar dar de baja</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas dar de baja a {employeeToDelete?.nombre}?
              Al dar de baja a un empleado, se eliminarán todos sus datos y no podrá acceder a su cuenta.
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
