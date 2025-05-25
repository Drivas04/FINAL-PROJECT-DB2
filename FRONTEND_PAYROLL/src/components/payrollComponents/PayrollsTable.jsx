import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useDataContext } from "@/context/DataContext";
import usePagination from "@/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import { Input } from "../ui/input";
import { getEmployeeByPayroll } from "@/helpers/payrollHelper";
import { usePayrollContext } from "@/context/PayrollContext";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { useContractContext } from "@/context/ContractContext";
import { useNavigate } from "react-router-dom";

export const PayrollsTable = () => {
  const { payrolls, deletePayroll } = usePayrollContext();
  const {employees} = useEmployeeContext();
  const { contracts } = useContractContext();
  const navigate  = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const dropdownRef = useRef(null);
  const {
    search,
    setSearch,
    filteredData: filteredPayrolls,
  } = useSearch(payrolls, "contratoIdContrato");
  const {
    currentPage,
    maxPage,
    goToPage,
    paginatedData,
  } = usePagination(filteredPayrolls, 5);


  const seeDetails = (payroll) => {
    navigate(`/empleados/${getEmployeeByPayroll(contracts, employees, payroll).id}/nominas/${payroll.idNomina}`);
    console.log(getEmployeeByPayroll(contracts, employees, payroll))
  }


  return (
    <>
    <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Buscar por ID de contrato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        
      </div>
      <Table>
        <TableCaption>Todas las nóminas generadas hasta la fecha.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id de nómina</TableHead>
            <TableHead>Empleado</TableHead>
            <TableHead>Periodo</TableHead>
            <TableHead>Fecha de pago</TableHead>
            <TableHead>Codigo de contrato</TableHead>
            <TableHead className="text-right">Total pagado</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((pay) => {
            const empleadoInfo = getEmployeeByPayroll(contracts, employees, pay);
            
            return (
              <TableRow key={pay.idNomina}>
                <TableCell className="font-medium">{pay.idNomina}</TableCell>
                <TableCell className="font-medium">
                  {empleadoInfo.nombre+' '+empleadoInfo.apellido || "Sin asignar"}
                  {empleadoInfo.documento && (
                    <span className="text-xs text-gray-500 block">
                      Doc: {empleadoInfo.documento}
                    </span>
                  )}
                </TableCell>
                <TableCell>{pay.periodo}</TableCell>
                <TableCell>{pay.fechaPago}</TableCell>
                <TableCell>{pay.contratoIdContrato}</TableCell>
                <TableCell className="text-right font-bold">
                  ${pay.pagoTotal !== null && pay.pagoTotal !== undefined 
                    ? parseFloat(pay.pagoTotal).toLocaleString() 
                    : "0"}
                </TableCell>
                <TableCell className="text-center">
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
                          onClick={() => {
                            seeDetails(pay);
                          }}
                        >Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem
                          className="!text-red-600 hover:!text-white hover:!bg-red-600"
                          onClick={() => {
                            if (dropdownRef.current) {
                              dropdownRef.current.click();
                            }
                            setTimeout(() => {
                              setSelectedPayroll(pay);
                              setIsDialogOpen(true);
                            }, 50);
                          }}
                        >
                          Eliminar nómina
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
      <div>
        <Button variant="ghost" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft />
        </Button>
        <span>{`Página ${currentPage} de ${maxPage}`}</span>
        <Button variant="ghost" onClick={() => goToPage(currentPage + 1)} hidden={currentPage === maxPage}>
          <ChevronRight />
        </Button>
      </div>

      {/* AlertDialog FUERA del DropdownMenu para evitar que se desmonte */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará la nómina de forma
              permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (selectedPayroll) {
                  try {
                    await deletePayroll(selectedPayroll.idNomina);
                    setSelectedPayroll(null);
                  } catch (error) {
                    console.error("Error al eliminar nómina:", error);
                  }
                }
                setIsDialogOpen(false);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
