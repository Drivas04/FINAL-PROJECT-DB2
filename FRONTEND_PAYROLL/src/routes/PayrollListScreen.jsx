import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { payroll } from '@/data/payroll';
import { contract } from '@/data/contract';
import { getEmployeeName } from '@/helpers/EmployeeHelper';
import { useDataContext } from '@/context/DataContext';
import { getEmployee } from '@/helpers/contractHelper';
import { id } from 'date-fns/locale';

export const PayrollListScreen = () => {

  const {idEmpleado} = useParams();
  const { employees } = useDataContext();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFakeNominas = () => {
      setLoading(true);

      const contratosDelEmpleado = contract
        .filter(c => c.id_empleado === parseInt(idEmpleado))
        .map(c => c.id_contrato);

      const nominasFiltradas = payroll.filter(n =>
        contratosDelEmpleado.includes(n.id_contrato)
      );

      setTimeout(() => {
        setPayrolls(nominasFiltradas);
        setLoading(false);
      }, 500);
    };

    fetchFakeNominas();
  }, [idEmpleado]);

  
  if(loading) return <h1>Loading...</h1>
  return (
    <div className="container mx-auto mt-5 w-auto">
      <h1 className='text-4xl font-bold mb-10 p-6'>Nominas del empleado {employees.find(e => e.id_empleado === parseInt(idEmpleado)).nombre}</h1>
      {payrolls.length === 0 ? (
        <p>No hay nóminas registradas para este empleado.</p>
      ) : (
      <Table>
      <TableCaption>A list of your recent payrolls.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Código</TableHead>
          <TableHead>Periodo</TableHead>
          <TableHead>Total pagado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payrolls.map((payroll) => (
          <TableRow key={payroll.id_nomina}>
            <TableCell className="font-medium text-center text-violet-600"><Link className='border-b-2 border-violet-600' to={`/empleados/${idEmpleado}/nominas/${payroll.id_nomina}`}>{payroll.id_nomina}</Link></TableCell>
            <TableCell className="font-medium">{payroll.periodo}</TableCell>
            <TableCell>${payroll.total_pagado}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      )}
    </div>
  )
}
