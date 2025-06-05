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
  const { employees, updateEmployee, deleteEmployee, fetchEmployees } = useEmployeeContext();
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
      <div className="container mx-auto mt-2 md:mt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 sm:mb-0">Empleados</h1>
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
          className="w-full sm:w-[300px]"
        />
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse border border-slate-300 min-w-[900px]">
          <TableCaption>
            Lista de todos los empleados activos en la empresa
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-xs md:text-sm">Nro. de documento</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Tipo de documento</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Nombres</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Apellidos</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Fecha de nacimiento</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Telefono</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Correo</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Fecha de contratación</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Departamento</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Número de cuenta</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {paginatedData.map((emp) => {
            return (
              <TableRow key={emp.numeroDocumento}>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {emp.numeroDocumento}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {emp.tipoDocumento}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">{emp.nombre}</TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">{emp.apellido}</TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {format(new Date(emp.fechaNacimiento).setHours(24), "dd-MM-yyyy", {
                    locale: es, 
                  })}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">{emp.telefono}</TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">{emp.correo}</TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {format(new Date(emp.fechaContratacion), "dd-MM-yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {getDepartmentName(
                    emp.departamentoIdDepartamento,
                    departments
                  )}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
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
              setOpen={(isOpen) => {
                setIsDialogOpen(isOpen);
                if (!isOpen) {
                  // Cuando se cierra el modal de edición, actualizamos los datos
                  fetchEmployees();
                  setSelectedEmployee(null);
                }
              }}
              employee={selectedEmployee}
              departmentName={getDepartmentName(
                selectedEmployee.departamentoIdDepartamento,
                departments
              )}
            />
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center sm:justify-start mt-4 gap-2">
        <Button
          variant="ghost"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <span className="text-xs sm:text-sm">{`Página ${currentPage} de ${maxPage}`}</span>
        <Button
          variant="ghost"
          onClick={() => goToPage(currentPage + 1)}
          hidden={currentPage === maxPage}
          className="h-8 w-8 p-0 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
    </div>
    </>
  );
};
