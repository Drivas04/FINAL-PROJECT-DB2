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
import { getEmployeeDocument } from "@/helpers/EmployeeHelper";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { getContractById } from "@/helpers/contractHelper";
import { useContractContext } from "@/context/ContractContext";
import { ChevronLeft, ChevronRight, FileCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const SeveranceListScreen = () => {
  const { cesantias, loadingCesantias } = useCesantiasContext();
  const { employees } = useEmployeeContext();
  const { contracts } = useContractContext();

  // Función para formatear moneda colombiana
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor || 0);
  };

  // Función para formatear fechas
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "N/A";
    
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-CO');
    } catch (error) {
      return fechaString;
    }
  };

  // Función para obtener información del empleado
  const obtenerInfoEmpleado = (cesantia) => {
    try {
      const contrato = getContractById(cesantia.contratoIdContrato, contracts);
      if (!contrato) return { nombre: "Contrato no encontrado", documento: "N/A" };
      
      const empleado = employees.find(e => e.idEmpleado === contrato.empleadoIdEmpleado);
      if (!empleado) return { nombre: "Empleado no encontrado", documento: "N/A" };
      
      return {
        nombre: empleado.nombre || "Sin nombre",
        documento: empleado.numeroDocumento || "Sin documento"
      };
    } catch (error) {
      console.error("Error al obtener info de empleado:", error);
      return { nombre: "Error", documento: "Error" };
    }
  };

  const {
    search,
    setSearch,
    filteredData: filteredSeverance,
  } = useSearch(cesantias, "idLiquidacion");
  
  const { currentPage, maxPage, goToPage, paginatedData } = usePagination(
    filteredSeverance,
    10
  );
  
  return (
    <>
      <div className="flex flex-col gap-4 container w-full m-auto mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Histórico de Retiros de Cesantías</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <FileCheck className="h-4 w-4" /> 
              Total: {cesantias?.length || 0} retiros
            </Badge>
          </div>
        </div>
        
        <input
          type="text"
          placeholder="Buscar por ID o empleado"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        
        {loadingCesantias ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead>Valor Retiro</TableHead>
                <TableHead>Intereses</TableHead>
                <TableHead>Fecha de pago</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Fondo</TableHead>
                <TableHead>Contrato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((cesantia) => {
                  const infoEmpleado = obtenerInfoEmpleado(cesantia);
                  return (
                    <TableRow key={cesantia.idLiquidacion}>
                      <TableCell className="font-medium text-center">
                        {cesantia.idLiquidacion}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{infoEmpleado.nombre}</span>
                          <span className="text-xs text-gray-500">Doc: {infoEmpleado.documento}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatearMoneda(cesantia.valorCesantias)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatearMoneda(cesantia.interesesCesantias)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatearFecha(cesantia.fechaPago)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          cesantia.motivoRetiro?.includes("Vivienda") ? "default" :
                          cesantia.motivoRetiro?.includes("Educacion") ? "secondary" :
                          cesantia.motivoRetiro?.includes("Terminacion") ? "destructive" :
                          "outline"
                        }>
                          {cesantia.motivoRetiro}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {cesantia.fondoCesantias}
                      </TableCell>
                      <TableCell className="text-center">
                        #{cesantia.contratoIdContrato}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    No hay registros de retiros de cesantías
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">{`Página ${currentPage} de ${maxPage || 1}`}</span>
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === maxPage || maxPage === 0}
            size="sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
