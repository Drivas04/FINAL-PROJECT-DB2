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

export const Departments = () => {
  const [departamento, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/departamentos/")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="overflow-x-auto container mx-auto mt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Departamentos</h1>
      </div>
      <div className="container mx-auto mt-10 w-[600px]">
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
            {departamento.map((dep) => (
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
