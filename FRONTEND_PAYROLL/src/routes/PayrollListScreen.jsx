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
import { getEmployeeName } from '@/helpers/EmployeeHelper';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { useContractContext } from '@/context/ContractContext';
import { usePayrollContext } from '@/context/PayrollContext';
import axios from 'axios';

export const PayrollListScreen = () => {

  const {idEmpleado} = useParams();
  const { employees } = useEmployeeContext();
  const { contracts } = useContractContext();
  const { payrolls: contextPayrolls } = usePayrollContext();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayrolls = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener los contratos del empleado
        const contratosDelEmpleado = contracts.filter(c => c.empleadoIdEmpleado === parseInt(idEmpleado));
        
        if (contratosDelEmpleado.length === 0) {
          setPayrolls([]);
          setLoading(false);
          return;
        }

        // Obtener nóminas para cada contrato del empleado desde el backend
        let nominasEmpleado = [];
        
        for (const contrato of contratosDelEmpleado) {
          try {
            const response = await axios.get(`http://localhost:8080/nominas/contrato/${contrato.idContrato}`);
            if (response.data && response.data.length > 0) {
              nominasEmpleado = [...nominasEmpleado, ...response.data];
            }
          } catch (contractError) {
            console.error(`Error al obtener nóminas del contrato ${contrato.idContrato}:`, contractError);
            // Continuamos con el siguiente contrato si hay error
          }
        }

        // Si no se obtuvieron nóminas del backend, usamos el contexto como respaldo
        if (nominasEmpleado.length === 0 && contextPayrolls.length > 0) {
          console.log("Usando datos del contexto como respaldo");
          nominasEmpleado = contextPayrolls.filter(nomina => 
            contratosDelEmpleado.some(contrato => contrato.idContrato === nomina.contratoIdContrato)
          );
        }

        // Ordenar las nóminas por fecha/periodo descendente
        nominasEmpleado.sort((a, b) => {
          // Asumimos que el periodo tiene formato YYYY-MM
          return b.periodo.localeCompare(a.periodo);
        });

        setPayrolls(nominasEmpleado);
      } catch (error) {
        console.error("Error al cargar las nóminas:", error);
        setError("No se pudieron cargar las nóminas. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, [idEmpleado, contracts, contextPayrolls]);

  if (loading) return <div className="container mx-auto mt-10 text-center">Cargando nóminas...</div>;
  
  if (error) return <div className="container mx-auto mt-10 text-center text-red-500">{error}</div>;
  
  // Buscar el empleado por su ID
  const empleado = employees.find(e => e.idEmpleado === parseInt(idEmpleado));
  const nombreEmpleado = empleado ? empleado.nombre : 'Empleado no encontrado';

  return (
    <div className="container mx-auto mt-5 w-auto">
      <h1 className='text-4xl font-bold mb-10 p-6'>Nóminas del empleado {nombreEmpleado}</h1>
      {payrolls.length === 0 ? (
        <p className="text-center text-gray-500 my-10">No hay nóminas registradas para este empleado.</p>
      ) : (
      <Table>
        <TableCaption>Lista de nóminas del empleado</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Código</TableHead>
            <TableHead>Periodo</TableHead>
            <TableHead>Total pagado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrolls.map((payroll) => (
            <TableRow key={payroll.idNomina || payroll.id_nomina}>
              <TableCell className="font-medium text-center text-violet-600">
                <Link className='border-b-2 border-violet-600' to={`/empleados/${idEmpleado}/nominas/${payroll.idNomina || payroll.id_nomina}`}>
                  {payroll.idNomina || payroll.id_nomina}
                </Link>
              </TableCell>
              <TableCell className="font-medium">{payroll.periodo}</TableCell>
              <TableCell>${payroll.totalPagado || payroll.total_pagado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </div>
  )
}
