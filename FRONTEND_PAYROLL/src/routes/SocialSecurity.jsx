import React, { useState, useEffect } from "react";
import { useDataContext } from "@/context/DataContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, FileDown, Search, ShieldCheck, Wallet } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSocialSecurityContext } from "@/context/SocialSecurityContext";

export const SocialSecurity = () => {
  // Estados para selección de empleado, nóminas y cálculos
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [nominasEmpleado, setNominasEmpleado] = useState([]);
  const [nominaSeleccionada, setNominaSeleccionada] = useState(null);
  const [periodoCargado, setPeriodoCargado] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  // Obtener datos de contexto
  const { employeeContext, contractContext, payrollContext } = useDataContext();
  const { employees } = employeeContext;
  const { contracts } = contractContext;
  const { payrolls } = payrollContext;
  const { 
    apropiaciones, 
    deducciones, 
    loadingApropiaciones, 
    loadingDeducciones,
    addApropiacion,
    addDeduccion
  } = useSocialSecurityContext();
  const { toast } = useToast();

  // Estado para almacenar los datos de seguridad social calculados
  const [datosSeguridadSocial, setDatosSeguridadSocial] = useState({ 
    deducciones: [], 
    apropiaciones: [] 
  });

  // Hook de búsqueda para filtrado de empleados
  const { search, setSearch, filteredData: empleadosFiltrados } = useSearch(employees, "nombre");

  // Efecto para cargar nóminas cuando se selecciona un empleado
  useEffect(() => {
    if (empleadoSeleccionado) {
      cargarNominasDelEmpleado(empleadoSeleccionado);
    }
  }, [empleadoSeleccionado]);

  // Efecto para cargar datos de seguridad social cuando se selecciona una nómina
  useEffect(() => {
    if (nominaSeleccionada) {
      cargarDatosSeguridadSocial(nominaSeleccionada.idNomina);
    }
  }, [nominaSeleccionada]);

  // Función para seleccionar un empleado
  const handleEmpleadoSelect = (empleadoId) => {
    const empleado = employees.find(e => e.idEmpleado === Number(empleadoId));
    setEmpleadoSeleccionado(empleado);
    setNominaSeleccionada(null);
    setPeriodoCargado("");
    setDatosSeguridadSocial({ deducciones: [], apropiaciones: [] });
  };

  // Función para cargar nóminas asociadas a un empleado
  const cargarNominasDelEmpleado = async (empleado) => {
    setLoading(true);
    try {
      // Obtener contratos del empleado
      const contratosEmpleado = contracts.filter(c => 
        c.empleadoIdEmpleado === empleado.idEmpleado
      );
      
      if (contratosEmpleado.length === 0) {
        setNominasEmpleado([]);
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Sin contratos",
          description: "El empleado no tiene contratos registrados"
        });
        return;
      }
      
      // Obtener las nóminas del empleado desde el backend o usar datos locales
      const idsContratos = contratosEmpleado.map(c => c.idContrato);
      let nominasDelEmpleado = [];
      
      try {
        // Intentar obtener nóminas por cada contrato
        for (const idContrato of idsContratos) {
          const response = await axios.get(`http://localhost:8080/nominas/contrato/${idContrato}`);
          if (response.data && response.data.length > 0) {
            nominasDelEmpleado = [...nominasDelEmpleado, ...response.data];
          }
        }
      } catch (error) {
        console.error("Error al obtener nóminas del backend:", error);
        // Si hay error con el backend, usar datos del contexto como respaldo
        nominasDelEmpleado = payrolls.filter(nomina => 
          contratosEmpleado.some(contrato => contrato.idContrato === nomina.contratoIdContrato)
        );
      }
      
      // Ordenar por fecha descendente
      const nominasOrdenadas = nominasDelEmpleado.sort((a, b) => 
        new Date(b.periodo) - new Date(a.periodo)
      );
      
      setNominasEmpleado(nominasOrdenadas);
      
      // Seleccionar la nómina más reciente por defecto
      if (nominasOrdenadas.length > 0) {
        setNominaSeleccionada(nominasOrdenadas[0]);
        setPeriodoCargado(formatearPeriodo(nominasOrdenadas[0].periodo));
      } else {
        toast({
          variant: "destructive",
          title: "Sin nóminas",
          description: "El empleado no tiene nóminas registradas"
        });
      }
    } catch (error) {
      console.error("Error al cargar nóminas:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las nóminas del empleado"
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para cambiar la nómina seleccionada
  const handleNominaChange = (nominaId) => {
    const nomina = nominasEmpleado.find(n => n.idNomina === Number(nominaId));
    setNominaSeleccionada(nomina);
    setPeriodoCargado(formatearPeriodo(nomina.periodo));
  };

  // Función para formatear el período de nómina
  const formatearPeriodo = (periodo) => {
    if (!periodo) return "";
    
    try {
      const fecha = new Date(periodo);
      return `${fecha.toLocaleString('es-CO', { month: 'long' })} ${fecha.getFullYear()}`;
    } catch (e) {
      return periodo.toString();
    }
  };

  // Función para calcular datos de seguridad social
  const cargarDatosSeguridadSocial = async (nominaId) => {
    setLoadingDetails(true);
    
    try {
      // Calculamos los valores basados en el salario
      const salarioBase = obtenerSalarioBase(nominaSeleccionada.contratoIdContrato);
      
      // Cargar las apropiaciones específicas de esta nómina desde el backend
      let apropiacionesNomina = [];
      let deduccionesNomina = [];
      
      try {
        // Intentar obtener apropiaciones específicas para esta nómina
        const responseAprop = await axios.get(`http://localhost:8080/apropiaciones/nomina/${nominaId}`);
        if (responseAprop.data && responseAprop.data.length > 0) {
          apropiacionesNomina = responseAprop.data;
        }
        
        // Intentar obtener deducciones específicas para esta nómina
        const responseDedu = await axios.get(`http://localhost:8080/deducciones/nomina/${nominaId}`);
        if (responseDedu.data && responseDedu.data.length > 0) {
          deduccionesNomina = responseDedu.data;
        }
      } catch (apiError) {
        console.error("Error al obtener datos específicos de la nómina:", apiError);
        // Si hay error con las apis específicas, continuamos con los valores del contexto
      }
      
      // Procesar deducciones: usar las específicas de la nómina si existen
      const deduccionesCalculadas = deduccionesNomina.length > 0 ? 
        deduccionesNomina.map(deduccion => {
          const porcentaje = deduccion.porcentaje || 
            (deduccion.tipoDeduccion === 'Salud' ? 4 : 
             deduccion.tipoDeduccion === 'Pensión' ? 4 : 0);
          
          return {
            tipoDeduccion: deduccion.tipoDeduccion,
            descripcion: deduccion.descripcion || `Aporte de ${deduccion.tipoDeduccion}`,
            porcentaje: porcentaje,
            valor: deduccion.valor || (salarioBase * porcentaje / 100)
          };
        }) : 
        deducciones.length > 0 ?
          // Si no hay deducciones específicas pero hay en el contexto general
          deducciones.map(deduccion => {
            const porcentaje = deduccion.porcentaje || 
              (deduccion.tipoDeduccion === 'Salud' ? 4 : 
               deduccion.tipoDeduccion === 'Pensión' ? 4 : 0);
            
            return {
              tipoDeduccion: deduccion.tipoDeduccion,
              descripcion: deduccion.descripcion || `Aporte de ${deduccion.tipoDeduccion}`,
              porcentaje: porcentaje,
              valor: (salarioBase * porcentaje / 100)
            };
          }) :
          // Valores por defecto solo como último recurso
          [
            { tipoDeduccion: "Salud", descripcion: "Aporte obligatorio a EPS", porcentaje: 4, valor: salarioBase * 0.04 },
            { tipoDeduccion: "Pensión", descripcion: "Aporte obligatorio a fondo de pensiones", porcentaje: 4, valor: salarioBase * 0.04 }
          ];
      
      // Procesar apropiaciones: usar las específicas de la nómina si existen
      const apropiacionesCalculadas = apropiacionesNomina.length > 0 ?
        apropiacionesNomina.map(apropiacion => {
          const porcentaje = apropiacion.porcentaje || 
            (apropiacion.tipoApropiacion === 'Salud' ? 8.5 : 
             apropiacion.tipoApropiacion === 'Pensión' ? 12 : 
             apropiacion.tipoApropiacion === 'ARL' ? 0.52 : 
             apropiacion.tipoApropiacion === 'Caja de Compensación' ? 4 : 0);
          
          return {
            tipoApropiacion: apropiacion.tipoApropiacion,
            descripcion: apropiacion.descripcion || `Aporte patronal de ${apropiacion.tipoApropiacion}`,
            porcentaje: porcentaje,
            valor: apropiacion.valor || (salarioBase * porcentaje / 100)
          };
        }) :
        apropiaciones.length > 0 ?
          // Si no hay apropiaciones específicas pero hay en el contexto general
          apropiaciones.map(apropiacion => {
            const porcentaje = apropiacion.porcentaje || 
              (apropiacion.tipoApropiacion === 'Salud' ? 8.5 : 
               apropiacion.tipoApropiacion === 'Pensión' ? 12 : 
               apropiacion.tipoApropiacion === 'ARL' ? 0.52 : 
               apropiacion.tipoApropiacion === 'Caja de Compensación' ? 4 : 0);
            
            return {
              tipoApropiacion: apropiacion.tipoApropiacion,
              descripcion: apropiacion.descripcion || `Aporte patronal de ${apropiacion.tipoApropiacion}`,
              porcentaje: porcentaje,
              valor: (salarioBase * porcentaje / 100)
            };
          }) :
          // Valores por defecto solo como último recurso
          [
            { tipoApropiacion: "Salud", descripcion: "Aporte patronal a EPS", porcentaje: 8.5, valor: salarioBase * 0.085 },
            { tipoApropiacion: "Pensión", descripcion: "Aporte patronal a fondo de pensiones", porcentaje: 12, valor: salarioBase * 0.12 },
            { tipoApropiacion: "ARL", descripcion: "Riesgos laborales", porcentaje: 0.52, valor: salarioBase * 0.0052 },
            { tipoApropiacion: "Caja de Compensación", descripcion: "Aporte a caja de compensación", porcentaje: 4, valor: salarioBase * 0.04 }
          ];
      
      setDatosSeguridadSocial({
        deducciones: deduccionesCalculadas,
        apropiaciones: apropiacionesCalculadas
      });
      
      toast({
        title: "Datos cargados",
        description: `Datos de seguridad social para ${periodoCargado} cargados correctamente.`
      });
      
    } catch (error) {
      console.error("Error al calcular datos de seguridad social:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron calcular los aportes. Intente nuevamente."
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const obtenerSalarioBase = (contratoId) => {
    const contrato = contracts.find(c => c.idContrato === contratoId);
    return contrato ? parseFloat(contrato.salario) : 0;
  };

  const totalEmpleado = datosSeguridadSocial.deducciones.reduce(
    (sum, item) => sum + parseFloat(item.valor || 0), 0
  );
  
  const totalEmpresa = datosSeguridadSocial.apropiaciones.reduce(
    (sum, item) => sum + parseFloat(item.valor || 0), 0
  );

  const formatoMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const exportarReporte = async () => {
    if (!nominaSeleccionada || !empleadoSeleccionado) return;
    
    try {
      toast({
        title: "Exportando reporte",
        description: "El reporte se está generando y descargará automáticamente."
      });
      
      // Aquí iría la lógica para exportar el reporte
      // Por ahora, solo es un placeholder que podría conectarse a un endpoint del backend
      
      // Ejemplo: descargar como CSV
      // const csvContent = generarCSV();
      // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(blob);
      // link.download = `seguridad_social_${empleadoSeleccionado.nombre}_${periodoCargado}.csv`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } catch (error) {
      console.error("Error al exportar el reporte:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo exportar el reporte. Intente nuevamente."
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seguridad Social</h1>
        <p className="text-gray-500">
          Consulta los aportes de seguridad social por empleado y periodo
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Panel de selección */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-violet-500" />
              Selección
            </CardTitle>
            <CardDescription>
              Seleccione el empleado y la nómina a consultar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar empleado..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Label htmlFor="empleado">Empleado</Label>
              <Select 
                value={empleadoSeleccionado?.idEmpleado?.toString()} 
                onValueChange={handleEmpleadoSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un empleado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {empleadosFiltrados.map(empleado => (
                      <SelectItem 
                        key={empleado.idEmpleado} 
                        value={empleado.idEmpleado.toString()}
                      >
                        {empleado.nombre} - {empleado.numeroDocumento}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {empleadoSeleccionado && (
              <div className="space-y-2">
                <Label htmlFor="nomina">Periodo de nómina</Label>
                <Select 
                  value={nominaSeleccionada?.idNomina?.toString()} 
                  onValueChange={handleNominaChange}
                  disabled={loading || nominasEmpleado.length === 0}
                >
                  <SelectTrigger>
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-4 w-4 border-2 border-violet-500 rounded-full border-t-transparent mr-2"></div>
                        Cargando...
                      </div>
                    ) : (
                      <SelectValue placeholder="Seleccione un periodo" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {nominasEmpleado.length > 0 ? (
                        nominasEmpleado.map(nomina => (
                          <SelectItem 
                            key={nomina.idNomina} 
                            value={nomina.idNomina.toString()}
                          >
                            {formatearPeriodo(nomina.periodo)}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="none">
                          No hay nóminas disponibles
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Panel de resultados */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-violet-500" />
                Detalle de aportes
              </CardTitle>
              {nominaSeleccionada && (
                <Badge variant="outline" className="text-violet-500 border-violet-200 bg-violet-50">
                  Periodo: {periodoCargado}
                </Badge>
              )}
            </div>
            <CardDescription>
              {empleadoSeleccionado 
                ? `Aportes de seguridad social para ${empleadoSeleccionado.nombre}`
                : "Seleccione un empleado para ver los detalles"}
            </CardDescription>
          </CardHeader>
          
          {nominaSeleccionada ? (
            loadingDetails ? (
              <CardContent className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center">
                  <div className="animate-spin h-10 w-10 border-4 border-violet-500 rounded-full border-t-transparent mb-4"></div>
                  <p className="text-gray-500">Cargando información de seguridad social...</p>
                </div>
              </CardContent>
            ) : (
              <CardContent className="p-0">
                <div className="p-6 pt-0">
                  <h3 className="text-lg font-medium mb-3">Deducciones (Aportes del empleado)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Concepto</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datosSeguridadSocial.deducciones.map((item, index) => (
                        <TableRow key={`deduccion-${index}`}>
                          <TableCell className="font-medium">{item.tipoDeduccion}</TableCell>
                          <TableCell>{item.descripcion}</TableCell>
                          <TableCell className="text-right">{formatoMoneda(item.valor)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2} className="font-bold">Total deducciones</TableCell>
                        <TableCell className="text-right font-bold">{formatoMoneda(totalEmpleado)}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-medium mb-3 text-violet-700">Apropiaciones (Aportes del empleador)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Concepto</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datosSeguridadSocial.apropiaciones.map((item, index) => (
                        <TableRow key={`apropiacion-${index}`}>
                          <TableCell className="font-medium">{item.tipoApropiacion}</TableCell>
                          <TableCell>{item.descripcion}</TableCell>
                          <TableCell className="text-right">{formatoMoneda(item.valor)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2} className="font-bold text-violet-700">Total apropiaciones</TableCell>
                        <TableCell className="text-right font-bold text-violet-700">{formatoMoneda(totalEmpresa)}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>

                  <div className="bg-gray-50 p-4 rounded-md mt-6">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total aportes (empleado + empresa)</span>
                      <span className="font-bold text-lg">{formatoMoneda(totalEmpleado + totalEmpresa)}</span>
                    </div>
                  </div>
                </div>
                
                <CardFooter className="bg-gray-50 border-t">
                  <Button variant="outline" className="ml-auto" size="sm" onClick={exportarReporte}>
                    <FileDown className="h-4 w-4 mr-2" /> Exportar reporte
                  </Button>
                </CardFooter>
              </CardContent>
            )
          ) : (
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <ChevronDown className="h-10 w-10 mb-4" />
                <p>Seleccione un empleado y un periodo para visualizar los aportes a seguridad social</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
