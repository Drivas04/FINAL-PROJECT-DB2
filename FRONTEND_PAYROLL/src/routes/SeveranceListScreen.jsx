import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePagination from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { useCesantiasContext } from "@/context/CesantiasContext";
import { getDocumentById } from "@/data/employees";
import { getEmployeeDocument } from "@/helpers/EmployeeHelper";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { getContractById } from "@/helpers/contractHelper";
import { useContractContext } from "@/context/ContractContext";

export const SeveranceListScreen = () => {

  const { cesantias, loadingCesantias } = useCesantiasContext();
  const { employees } = useEmployeeContext();
  const { contracts } = useContractContext();

  const {
    search,
    setSearch,
    filteredData: filteredSeverance,
  } = useSearch(cesantias, "idLiquidacion");
  const { currentPage, maxPage, goToPage, paginatedData } = usePagination(
    filteredSeverance,
    5
  );
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Lista de Cesantías</h1>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        {loadingCesantias ? (
          <p>Cargando...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>Valor Retiro</TableHead>
                <TableHead>Intereses</TableHead>
                <TableHead>Fecha de pago</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Fondo</TableHead>
                <TableHead>Codigo de contrato</TableHead>
                <TableHead>Documento del empleado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((cesantia) => (
                <TableRow key={cesantia.idLiquidacion}>
                  <TableCell className='text-center'>{cesantia.idLiquidacion}</TableCell>
                  <TableCell className='text-center'>{cesantia.periodo}</TableCell>
                  <TableCell className='text-center'>{cesantia.valorCesantias}</TableCell>
                  <TableCell className='text-center'>{cesantia.interesesCesantias}</TableCell>
                  <TableCell className='text-center'>{cesantia.fechaPago}</TableCell>
                  <TableCell className='text-center'>{cesantia.motivoRetiro}</TableCell>
                  <TableCell className='text-center'>{cesantia.fondoCesantias}</TableCell>
                  <TableCell className='text-center'>{cesantia.contratoIdContrato}</TableCell>
                  <TableCell className='text-center'>{getEmployeeDocument(getContractById(cesantia.contratoIdContrato, contracts).empleadoIdEmpleado ,employees)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};
