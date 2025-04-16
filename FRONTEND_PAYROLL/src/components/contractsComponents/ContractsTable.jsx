import React, { useState } from "react";
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
import { contract } from "@/data/contract";
import { EditContractComponent } from "./EditContractComponent";
import { useDataContext } from "@/context/DataContext";
import { getEmployeeDocument, getEmployeeName } from "@/helpers/EmployeeHelper";

export const ContractsTable = () => {
  const {contracts, updateContract} = useDataContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  

  return (
    <div className="overflow-x-auto container mx-auto mt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Contratos</h1>
      </div>
      <Table className="w-full border-collapse border border-slate-300">
        <TableCaption>Lista de los contratos activos hasta la fecha</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Documento del empleado</TableHead>
            <TableHead>Nombre del empleado</TableHead>
            <TableHead>Tipo de contrato</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Fecha de inicio</TableHead>
            <TableHead>Fecha de finalización</TableHead>
            <TableHead>Salario</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => {
            return (
              <TableRow key={contract.id_contrato}>
                <TableCell className="text-center">
                  {contract.id_contrato}
                </TableCell>
                <TableCell className="text-center">
                  {getEmployeeDocument(contract.id_empleado)}
                </TableCell>
                <TableCell className="text-center">
                  {getEmployeeName(contract.id_empleado)}
                </TableCell>
                <TableCell className="text-center">
                  {contract.tipo_contrato}
                </TableCell>
                <TableCell className="text-center">
                  {contract.cargo}
                </TableCell>
                <TableCell className="text-center">
                  {format(new Date(contract.fecha_inicio), "d-MM-yyyy", { locale: es })}
                </TableCell>
                <TableCell className="text-center">
                  {contract.fecha_fin ? format(new Date(contract.fecha_fin), "d-MM-yyyy", { locale: es }) : "Indefinido"}
                </TableCell>
                <TableCell className="text-center">
                  {contract.salario}
                </TableCell>
                <TableCell className="text-center">{contract.estado}</TableCell>
                <TableCell className="text-center"><DropdownMenu>
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
                          setSelectedContract(contract);}}
                      >
                        Editar contrato
                      </DropdownMenuItem>
                      <DropdownMenuItem className="!text-red-600 hover:!text-white hover:!bg-red-600">
                        Recindir contrato
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu></TableCell>
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
    </div>
  );
};
