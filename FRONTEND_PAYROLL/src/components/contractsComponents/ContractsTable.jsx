import React, { useState } from "react";
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
import { contract } from "@/data/contract";

export const ContractsTable = () => {
  const [contracts, setContracts] = useState(contract);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Id del empleado</TableHead>
          <TableHead>Tipo de contrato</TableHead>
          <TableHead>Fecha de inicio</TableHead>
          <TableHead>Fecha de finalización</TableHead>
          <TableHead>Salario</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contract.map((contract) => {
          return (
            <TableRow key={contract.id_contrato}>
              <TableCell className="text-center">
                {contract.id_contrato}
              </TableCell>
              <TableCell className="text-center">
                {contract.id_empleado}
              </TableCell>
              <TableCell className="text-center">
                {contract.tipo_contrato}
              </TableCell>
              <TableCell className="text-center">
                {contract.fecha_inicio}
              </TableCell>
              <TableCell className="text-center">
                {contract.fecha_fin ? contract.fecha_fin : "Indefinido"}
              </TableCell>
              <TableCell className="text-center">{contract.salario}</TableCell>
              <TableCell className="text-center">{contract.estado}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
