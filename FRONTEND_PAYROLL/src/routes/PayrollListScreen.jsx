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
    <div className="container mx-auto mt-3 md:mt-5 px-4 md:px-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
        <h1 className='text-2xl md:text-4xl font-bold mb-4 sm:mb-0 p-0 md:p-2'>{nombreEmpleado}</h1>
        <Link to={`/nominas/registrar`} className="w-full sm:w-auto">
          <button className="bg-violet-600 text-white px-4 py-2 rounded-md w-full sm:w-auto text-sm md:text-base">
            Registrar nueva nómina
          </button>
        </Link>
      </div>
      {payrolls.length === 0 ? (
        <p className="text-center text-gray-500 my-6 md:my-10">No hay nóminas registradas para este empleado.</p>
      ) : (
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>Lista de nóminas del empleado</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-xs md:text-sm">Código</TableHead>
              <TableHead className="text-xs md:text-sm">Periodo</TableHead>
              <TableHead className="text-xs md:text-sm">Total pagado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrolls.map((payroll) => (
              <TableRow key={payroll.idNomina || payroll.id_nomina}>
                <TableCell className="font-medium text-center text-violet-600 text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">
                  <Link className='border-b-2 border-violet-600' to={`/empleados/${idEmpleado}/nominas/${payroll.idNomina || payroll.id_nomina}`}>
                    {payroll.idNomina || payroll.id_nomina}
                  </Link>
                </TableCell>
                <TableCell className="font-medium text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">{payroll.periodo}</TableCell>
                <TableCell className="text-xs md:text-sm px-2 py-2 md:px-4 md:py-4">${payroll.totalPagado || payroll.total_pagado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      )}
    </div>
    
  )
}
