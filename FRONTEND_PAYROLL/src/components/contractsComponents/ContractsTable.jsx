import React, { useRef, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { EditContractComponent } from "./EditContractComponent";
import { getEmployeeDocument, getEmployeeName } from "@/helpers/EmployeeHelper";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useContractContext } from "@/context/ContractContext";
import { useEmployeeContext } from "@/context/EmployeeContext";

export const ContractsTable = () => {
  const { contracts, loadingContracts, updateContract } = useContractContext();
  const { employees } = useEmployeeContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const dropdownRef = useRef(null);
  const {
    search,
    setSearch,
    filteredData: filteredContracts,
  } = useSearch(contracts, "idContrato");
  const { currentPage, maxPage, goToPage, paginatedData } = usePagination(
    filteredContracts,
    5
  );

  console.log(contracts)

  if (loadingContracts) return <p>Cargando contratos...</p>;

  return (
    <div className="container mx-auto mt-2 md:mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-5">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 sm:mb-0">Contratos</h1>
        <Button variant="outline" onClick={() => window.location.href = "/new-contract"} className="w-full sm:w-auto">
          Registrar nuevo contrato
        </Button>
      </div>
      <div className="flex items-center justify-between mb-4 pl-0 sm:pl-2">
        <Input
          placeholder="Buscar por codigo de contrato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[300px]"
        />
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse border border-slate-300 min-w-[900px]">
          <TableCaption>
            Lista de los contratos activos hasta la fecha
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center text-xs md:text-sm">Id</TableHead>
              <TableHead className="text-center text-xs md:text-sm">
                Documento del empleado
              </TableHead>
              <TableHead className="text-center text-xs md:text-sm">Nombre del empleado</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Tipo de contrato</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Cargo</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Fecha de inicio</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Fecha de finalización</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Salario</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Estado</TableHead>
              <TableHead className="text-center text-xs md:text-sm">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {paginatedData.map((contract) => {
            return (
              <TableRow key={contract.idContrato}>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {contract.idContrato}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {getEmployeeDocument(contract.empleadoIdEmpleado, employees)}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {getEmployeeName(contract.empleadoIdEmpleado, employees)}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {contract.tipoContrato}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">{contract.nombreCargo}</TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {format(new Date(contract.fechaInicio), "d-MM-yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {contract.fecha_fin
                    ? format(new Date(contract.fechaFin), "d-MM-yyyy", {
                        locale: es,
                      })
                    : "Indefinido"}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  {contract.salario}
                </TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">{contract.estado === 'A'?'Activo':'Inactivo'}</TableCell>
                <TableCell className="text-center text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button ref={dropdownRef} variant="ghost" className="h-8 w-8 p-0">
                        <HiEllipsisHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Ver contrato</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (dropdownRef.current) {
                              dropdownRef.current.click();
                            }

                            setTimeout(() => {
                              setIsDialogOpen(true);
                              setSelectedContract(contract);
                            }, 50);
                          }}
                        >
                          Editar contrato
                        </DropdownMenuItem>
                        <DropdownMenuItem className="!text-red-600 hover:!text-white hover:!bg-red-600">
                          Recindir contrato
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
          {selectedContract && (
            <EditContractComponent
              open={isDialogOpen}
              setOpen={setIsDialogOpen}
              contract={selectedContract}
              onUpdateContract={updateContract}
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
    </div>
    </ div>
  );
};
