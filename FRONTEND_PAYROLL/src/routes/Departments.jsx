import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useDepartmentContext } from "@/context/DepartmentsContext";

export const Departments = () => {
  const { departments, loadingDepartments } = useDepartmentContext();

  

  return (
    <div className="overflow-x-auto container mx-auto mt-6 md:mt-10 px-4 md:px-6">
      <div className="flex justify-between items-center mb-3 md:mb-5">
        <h1 className="text-2xl md:text-4xl font-bold">Departamentos</h1>
      </div>
      <div className="container mx-auto mt-6 md:mt-10 w-full md:w-[600px]">
        <Table className="w-full border-collapse border border-slate-300">
          <TableCaption>
            Lista de los departamentos actuales en la empresa.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Código</TableHead>
              <TableHead className="text-center">Departamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dep) => (
              <TableRow key={dep.id}>
                <TableCell className="text-center">{dep.id}</TableCell>
                <TableCell className="text-center capitalize"> 
                  {dep.nombreDepartamento}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
