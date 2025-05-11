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
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getEmployeeName } from '@/helpers/EmployeeHelper';
import { useEmployeeContext } from '@/context/EmployeeContext';
import { useContractContext } from '@/context/ContractContext';
import { usePayrollContext } from '@/context/PayrollContext';
import { useSocialSecurityContext } from '@/context/SocialSecurityContext';
import axios from 'axios';

export const PayrollDetailsScreen = () => {
  const { idEmpleado, idNomina } = useParams();
  const { employees } = useEmployeeContext();
  const { contracts } = useContractContext();
  const { payrolls: contextPayrolls } = usePayrollContext();
  const { deducciones: contextDeducciones } = useSocialSecurityContext();
  
  const [payrollDetails, setPayrollDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deducciones, setDeducciones] = useState([]);
  const [apropiaciones, setApropiaciones] = useState([]);

  useEffect(() => {
    const fetchPayrollDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Intentar obtener los detalles de la nómina desde el backend
        const response = await axios.get(`http://localhost:8080/nominas/${idNomina}`);
        
        if (response.data) {
          setPayrollDetails(response.data);
        } else {
          // Si no hay datos del backend, buscar en el contexto
          const nominaEnContexto = contextPayrolls.find(
            n => (n.idNomina === parseInt(idNomina) || n.id_nomina === parseInt(idNomina))
          );
          
          if (nominaEnContexto) {
            setPayrollDetails(nominaEnContexto);
          } else {
            setError("No se encontró la nómina solicitada");
          }
        }
      } catch (error) {
        console.error("Error al cargar los detalles de la nómina:", error);
        
        // Intentar usar datos del contexto como respaldo
        const nominaEnContexto = contextPayrolls.find(
          n => (n.idNomina === parseInt(idNomina) || n.id_nomina === parseInt(idNomina))
        );
        
        if (nominaEnContexto) {
          setPayrollDetails(nominaEnContexto);
        } else {
          setError("No se pudieron cargar los detalles de la nómina. Por favor, intenta de nuevo más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollDetails();
  }, [idNomina, contextPayrolls]);

  useEffect(() => {
    const fetchDeducciones = async () => {
      if (!idNomina) return;
      
      try {
        // Intentar obtener deducciones desde el backend
        const response = await axios.get(`http://localhost:8080/deducciones/nomina/${idNomina}`);
        if (response.data && response.data.length > 0) {
          setDeducciones(response.data);
        } else {
          // Si no hay datos del backend, buscar en el contexto
          const deduccionesDeNomina = contextDeducciones?.filter(
            d => d.nomina_id_nomina === parseInt(idNomina)
          );
          
          if (deduccionesDeNomina && deduccionesDeNomina.length > 0) {
            setDeducciones(deduccionesDeNomina);
          } else {
            // Cargar desde datos estáticos si están disponibles
            try {
              const { deductions } = await import('@/data/deductions.js');
              const deduccionesEstaticas = deductions?.filter(
                d => d.nomina_id_nomina === parseInt(idNomina)
              );
              setDeducciones(deduccionesEstaticas || []);
            } catch (err) {
              console.error("Error al cargar deducciones estáticas:", err);
              setDeducciones([]);
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar deducciones:", error);
        setDeducciones([]);
      }
    };

    fetchDeducciones();
  }, [idNomina, contextDeducciones]);
  
  useEffect(() => {
    const fetchApropiaciones = async () => {
      if (!idNomina) return;
      
      try {
        // Intentar obtener apropiaciones desde el backend
        const response = await axios.get(`http://localhost:8080/apropiaciones/nomina/${idNomina}`);
        if (response.data && response.data.length > 0) {
          setApropiaciones(response.data);
        } else {
          // Cargar desde datos estáticos si están disponibles
          try {
            const { apropriations } = await import('@/data/appropriations.js');
            const apropiacionesEstaticas = apropriations?.filter(
              a => a.nomina_id_nomina === parseInt(idNomina)
            );
            setApropiaciones(apropiacionesEstaticas || []);
          } catch (err) {
            console.error("Error al cargar apropiaciones estáticas:", err);
            setApropiaciones([]);
          }
        }
      } catch (error) {
        console.error("Error al cargar apropiaciones:", error);
        setApropiaciones([]);
      }
    };

    fetchApropiaciones();
  }, [idNomina]);

  // Buscar el empleado por su ID
  const empleado = employees.find(e => e.idEmpleado === parseInt(idEmpleado));
  const nombreEmpleado = empleado ? empleado.nombre + ' ' + empleado.apellido : 'Empleado no encontrado';


  if (loading) return <div className="container mx-auto mt-10 text-center">Cargando detalles de la nómina...</div>;
  
  if (error) return <div className="container mx-auto mt-10 text-center text-red-500">{error}</div>;
  
  if (!payrollDetails) return <div className="container mx-auto mt-10 text-center">No se encontró información de esta nómina</div>;

  // Normalizar nombres de propiedades (pueden venir del backend con diferentes formatos)
  const {
    periodo = payrollDetails.periodo,
    fechaPago = payrollDetails.fechaPago || payrollDetails.fecha_pago,
    salarioBase = payrollDetails.salarioBase || payrollDetails.salario_base,
    totalPagado = payrollDetails.totalPagado || payrollDetails.total_pagado,
    diasTrabajados = payrollDetails.diasTrabajados || payrollDetails.dias_trabajados,
    contratoIdContrato = payrollDetails.contratoIdContrato || payrollDetails.contrato_id_contrato
  } = payrollDetails;

  // Obtener datos del contrato
  const contrato = contracts.find(c => c.idContrato === parseInt(contratoIdContrato));

  // Calcular el total de deducciones
  const totalDeducciones = deducciones.reduce((total, deduccion) => 
    total + parseFloat(deduccion.valor || 0), 0);
    
  // Calcular el total de apropiaciones
  const totalApropiaciones = apropiaciones.reduce((total, apropiacion) => 
    total + parseFloat(apropiacion.valor || 0), 0);

  return (
    <div className="container mx-auto mt-5 w-auto">
      <div className="mb-4">
        <Link to={`/empleados/${idEmpleado}/nominas`} className="text-violet-600 hover:underline">
          ← Volver a nóminas
        </Link>
      </div>
      
      <h1 className='text-3xl font-bold mb-6'>Detalles de Nómina</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>Datos básicos de esta nómina</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Empleado:</span>
                <span>{nombreEmpleado}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Periodo:</span>
                <span>{periodo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Fecha de Pago:</span>
                <span>{new Date(fechaPago).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Días Trabajados:</span>
                <span>{diasTrabajados}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cargo:</span>
                <span>{contrato?.nombreCargo || 'No disponible'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen de Pago</CardTitle>
            <CardDescription>Totales de esta nómina</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Salario Base:</span>
                <span>${contrato?.salario.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Devengado:</span>
                <span>${totalPagado?.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Deducciones:</span>
                <span className="text-red-500">${totalDeducciones.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Apropiaciones:</span>
                <span className="text-red-500">${totalApropiaciones.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t">
                <span className="font-bold">Total Pagado:</span>
                <span className="font-bold text-green-600">${(parseFloat(totalPagado || 0) - totalDeducciones - totalApropiaciones).toLocaleString('es-CO')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Deducciones</CardTitle>
            <CardDescription>Conceptos que restan al pago</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deducciones.length > 0 ? (
                  deducciones.map((deduccion) => (
                    <TableRow key={deduccion.id_deduccion || deduccion.idDeduccion}>
                      <TableCell className="font-medium">
                        {deduccion.tipo_deduccion || deduccion.tipoDeduccion}
                      </TableCell>
                      <TableCell>{deduccion.descripcion}</TableCell>
                      <TableCell className="text-right text-red-500">
                        ${parseFloat(deduccion.valor).toLocaleString('es-CO')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      No hay deducciones registradas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {deducciones.length > 0 && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">
                      ${totalDeducciones.toLocaleString('es-CO')}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Apropiaciones</CardTitle>
            <CardDescription>Aportes realizados por el empleador</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apropiaciones.length > 0 ? (
                  apropiaciones.map((apropiacion) => (
                    <TableRow key={apropiacion.id_apropiacion || apropiacion.idApropiacion}>
                      <TableCell className="font-medium">
                        {apropiacion.tipo_apropiacion || apropiacion.tipoApropiacion}
                      </TableCell>
                      <TableCell className="text-right text-violet-600">
                        ${parseFloat(apropiacion.valor).toLocaleString('es-CO')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-gray-500">
                      No hay apropiaciones registradas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {apropiaciones.length > 0 && (
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">
                      ${totalApropiaciones.toLocaleString('es-CO')}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-right mb-8">
        <Badge className="bg-green-600">Pagada</Badge>
      </div>
    </div>
  );
}
