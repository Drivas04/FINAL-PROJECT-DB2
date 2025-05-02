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
    <div className="overflow-x-auto container mx-auto mt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Contratos</h1>
      </div>
      <div className="flex items-center justify-between mb-4 pl-2">
        <Input
          placeholder="Buscar por codigo de contrato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px]"
        />
      </div>
      <Table className="w-full border-collapse border border-slate-300">
        <TableCaption>
          Lista de los contratos activos hasta la fecha
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Id</TableHead>
            <TableHead className="text-center">
              Documento del empleado
            </TableHead>
            <TableHead className="text-center">Nombre del empleado</TableHead>
            <TableHead className="text-center">Tipo de contrato</TableHead>
            <TableHead className="text-center">Cargo</TableHead>
            <TableHead className="text-center">Fecha de inicio</TableHead>
            <TableHead className="text-center">Fecha de finalización</TableHead>
            <TableHead className="text-center">Salario</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((contract) => {
            return (
              <TableRow key={contract.idContrato}>
                <TableCell className="text-center">
                  {contract.idContrato}
                </TableCell>
                <TableCell className="text-center">
                  {getEmployeeDocument(contract.empleadoIdEmpleado, employees)}
                </TableCell>
                <TableCell className="text-center">
                  {getEmployeeName(contract.empleadoIdEmpleado, employees)}
                </TableCell>
                <TableCell className="text-center">
                  {contract.tipoContrato}
                </TableCell>
                <TableCell className="text-center">{contract.nombreCargo}</TableCell>
                <TableCell className="text-center">
                  {format(new Date(contract.fechaInicio), "d-MM-yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {contract.fecha_fin
                    ? format(new Date(contract.fechaFin), "d-MM-yyyy", {
                        locale: es,
                      })
                    : "Indefinido"}
                </TableCell>
                <TableCell className="text-center">
                  {contract.salario}
                </TableCell>
                <TableCell className="text-center">{contract.estado === 'A'?'Activo':'Inactivo'}</TableCell>
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
    </div>
  );
};
