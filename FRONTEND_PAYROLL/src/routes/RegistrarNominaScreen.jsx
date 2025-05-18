import React, { useState } from 'react'
import { useDataContext } from "@/context/DataContext";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Calculator, CheckCircle, Info, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import axios from 'axios';
import { logApiResponse, extractNominaId, logIDExtraction, verificarNominaCreada } from "@/utils/debugUtils";

export const RegistrarNominaScreen = () => {
  const { contractContext, employeeContext, payrollContext } = useDataContext();
  const { contracts } = contractContext;
  const { employees } = employeeContext;
  const { setPayrolls } = payrollContext;
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("datos-basicos");
  const [selectedContractId, setSelectedContractId] = useState("");
  const [form, setForm] = useState({
    periodo: "",
    horasExtras: "0",
    diasTrabajados: "30", // Valor por defecto
  });

  // Estados para apropiaciones y deducciones
  const [apropiaciones, setApropiacion] = useState([
    { concepto: "Salud", porcentaje: 8.5, valor: 0 },
    { concepto: "Pensión", porcentaje: 12, valor: 0 },
    { concepto: "ARL", porcentaje: 0.52, valor: 0 },
  ]);
  
  const [deducciones, setDeducciones] = useState([
    { concepto: "Salud", porcentaje: 4, valor: 0 },
    { concepto: "Pensión", porcentaje: 4, valor: 0 },
  ]);

  // Estado para nuevas apropiaciones/deducciones
  const [nuevaApropiacion, setNuevaApropiacion] = useState({ concepto: "", porcentaje: "", valor: "" });
  const [nuevaDeduccion, setNuevaDeduccion] = useState({ concepto: "", porcentaje: "", valor: "" });
  
  // Función auxiliar para validar formato de fecha ISO (YYYY-MM-DD)
  const isValidISODate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    const timestamp = date.getTime();
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }
    
    return date.toISOString().slice(0, 10) === dateString;
  }

  // Obtener el contrato seleccionado y su empleado asociado
  const selectedContract = contracts.find(
    (c) => String(c.idContrato) === String(selectedContractId)
  );
  const selectedEmployee = selectedContract
    ? employees.find((e) => e.idEmpleado === selectedContract.empleadoIdEmpleado)
    : null;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleContractChange = (value) => {
    // Verificar que el valor no sea nulo o vacío
    if (!value) {
      setSelectedContractId("");
      // Limpiar valores de apropiaciones y deducciones
      setApropiacion(prevApropiaciones => 
        prevApropiaciones.map(item => ({
          ...item,
          valor: 0
        }))
      );
      setDeducciones(prevDeducciones => 
        prevDeducciones.map(item => ({
          ...item,
          valor: 0
        }))
      );
      return;
    }
    
    // Asignar el ID seleccionado
    setSelectedContractId(value);
    console.log("Contrato seleccionado: ID =", value);
    
    // Si hay un contrato seleccionado, actualizar los valores de apropiaciones y deducciones
    const contrato = contracts.find(c => String(c.idContrato) === String(value));
    if (contrato && contrato.salario) {
      const salarioBase = parseFloat(contrato.salario);
      console.log("Salario base del contrato:", salarioBase);
      
      // Actualizar valores de apropiaciones basados en el salario
        setApropiacion(prevApropiaciones => 
          prevApropiaciones.map(item => ({
            ...item,
            valor: (salarioBase * item.porcentaje / 100).toFixed(2)
          }))
        );
        
        // Actualizar valores de deducciones basados en el salario
        setDeducciones(prevDeducciones => 
          prevDeducciones.map(item => ({
            ...item,
            valor: (salarioBase * item.porcentaje / 100).toFixed(2)
          }))
        );
      }
  };

  // Manejar adición de nueva apropiación
  const handleAddApropiacion = () => {
    if (!nuevaApropiacion.concepto || !nuevaApropiacion.porcentaje) {
      toast({
        variant: "destructive", 
        title: "Error", 
        description: "Debes completar el concepto y porcentaje"
      });
      return;
    }
    
    const valor = selectedContract ? 
      (parseFloat(selectedContract.salario) * parseFloat(nuevaApropiacion.porcentaje) / 100).toFixed(2) : 
      parseFloat(nuevaApropiacion.valor || 0).toFixed(2);
    
    setApropiacion([...apropiaciones, { 
      ...nuevaApropiacion, 
      porcentaje: parseFloat(nuevaApropiacion.porcentaje),
      valor
    }]);
    
    setNuevaApropiacion({ concepto: "", porcentaje: "", valor: "" });
  };

  // Manejar adición de nueva deducción
  const handleAddDeduccion = () => {
    if (!nuevaDeduccion.concepto || !nuevaDeduccion.porcentaje) {
      toast({
        variant: "destructive", 
        title: "Error", 
        description: "Debes completar el concepto y porcentaje"
      });
      return;
    }
    
    const valor = selectedContract ? 
      (parseFloat(selectedContract.salario) * parseFloat(nuevaDeduccion.porcentaje) / 100).toFixed(2) : 
      parseFloat(nuevaDeduccion.valor || 0).toFixed(2);
    
    setDeducciones([...deducciones, { 
      ...nuevaDeduccion, 
      porcentaje: parseFloat(nuevaDeduccion.porcentaje),
      valor
    }]);
    
    setNuevaDeduccion({ concepto: "", porcentaje: "", valor: "" });
  };

  // Eliminar apropiación
  const handleDeleteApropiacion = (index) => {
    setApropiacion(apropiaciones.filter((_, i) => i !== index));
  };

  // Eliminar deducción
  const handleDeleteDeduccion = (index) => {
    setDeducciones(deducciones.filter((_, i) => i !== index));
  };

  // Calcular totales
  const totalApropiaciones = apropiaciones.reduce((sum, item) => sum + parseFloat(item.valor || 0), 0).toFixed(2);
  const totalDeducciones = deducciones.reduce((sum, item) => sum + parseFloat(item.valor || 0), 0).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log para depuración
    console.log("Iniciando registro de nómina con datos:", {
      periodo: form.periodo,
      horasExtras: form.horasExtras,
      diasTrabajados: form.diasTrabajados,
      contratoId: selectedContractId || "NO SELECCIONADO"
    });
    
    // Validar que estén completos los datos requeridos
    if (!selectedContractId) {
      console.error("ERROR: Intento de envío sin seleccionar contrato");
      toast({
        variant: "destructive",
        title: "Contrato no seleccionado",
        description: "Por favor selecciona un contrato para registrar la nómina"
      });
      setActiveTab("datos-basicos");
      return;
    }
    
    // Validar que estén completos los datos básicos
    if (!form.periodo) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor ingresa el período para la nómina"
      });
      setActiveTab("datos-basicos");
      return;
    }
    
    // Validar que no exista una nómina para este período
    try {
      const response = await axios.get(`http://localhost:8080/nominas`);
      const nominaExistente = response.data?.find(
        nomina => nomina.periodo === form.periodo
      );
      
      if (nominaExistente) {
        console.error("ERROR: Ya existe una nómina para este período:", nominaExistente);
        toast({
          variant: "destructive",
          title: "Período duplicado",
          description: "Ya existe una nómina registrada para este período. Por favor selecciona otro período."
        });
        setActiveTab("datos-basicos");
        return;
      }
    } catch (error) {
      console.error("Error al verificar existencia de nómina:", error);
      // Continuamos con la creación aunque haya error en la verificación
    }
    
    // Validar formato de fecha
    if (!isValidISODate(form.periodo)) {
      toast({
        variant: "destructive",
        title: "Formato de fecha incorrecto",
        description: "La fecha debe estar en formato YYYY-MM-DD (por ejemplo: 2025-05-18)"
      });
      setActiveTab("datos-basicos");
      return;
    }
    
    try {
      // Verificar explícitamente que el ID del contrato no sea null o undefined
      if (!selectedContractId) {
        toast({
          variant: "destructive",
          title: "Error en ID de contrato",
          description: "El ID del contrato no puede estar vacío"
        });
        setActiveTab("datos-basicos");
        return;
      }
      
      // Asegurarnos que los datos tienen el formato correcto
      // Convertir explícitamente a los tipos esperados por el backend
      const horasExtrasValue = parseFloat(form.horasExtras || 0);
      const contratoId = parseInt(selectedContractId);
      
      // Verificar que los valores numéricos son válidos
      if (isNaN(horasExtrasValue) || isNaN(contratoId) || contratoId <= 0) {
        throw new Error("Los valores numéricos no son válidos o el ID del contrato es inválido");
      }
      
      // Objeto para enviar al backend (estructura exacta según Swagger)
      // Nos aseguramos de que todos los valores sean del tipo correcto
      const nominaData = {
        periodo: form.periodo, // Formato YYYY-MM-DD desde el input type="date"
        contratoIdContrato: contratoId,
        horasExtras: horasExtrasValue,
      };
      
      // Verificación de valores nulos o undefined
      if (!nominaData.periodo) {
        throw new Error("El período no puede estar vacío");
      }
      
      if (nominaData.contratoIdContrato === null || nominaData.contratoIdContrato === undefined || 
          Number.isNaN(nominaData.contratoIdContrato) || nominaData.contratoIdContrato <= 0) {
        console.error("ID de contrato inválido:", nominaData.contratoIdContrato);
        throw new Error(`ID de contrato inválido: ${nominaData.contratoIdContrato}`);
      }
      
      // Log detallado para depuración de tipo de datos
      console.log("Datos a enviar al servidor (con tipos):", {
        periodo: `${nominaData.periodo} (${typeof nominaData.periodo})`,
        horasExtras: `${nominaData.horasExtras} (${typeof nominaData.horasExtras})`,
        contratoIdContrato: `${nominaData.contratoIdContrato} (${typeof nominaData.contratoIdContrato})`
      });
      
      console.log("Datos a enviar al servidor (JSON):", JSON.stringify(nominaData, null, 2));
      
      // Configurar el encabezado correcto para la solicitud
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      // Implementación de la llamada a la API para registrar la nómina
      const response = await axios.post("http://localhost:8080/nominas", nominaData, config);
      
      // Usar nuestras utilidades de depuración para analizar la respuesta
      logApiResponse(response, "Respuesta de creación de nómina");
      
      // Extraer el ID de la nómina recién creada usando nuestra utilidad
      let idNomina = extractNominaId(response);
      
      // Registrar los intentos de extracción para depuración
      if (!idNomina) {
        console.log("Intentando métodos adicionales de extracción de ID...");
        logIDExtraction(response.data);
        
        // Si todo lo anterior falla, intentar buscar en la respuesta completa
        if (typeof response.data === 'string') {
          console.log("Analizando respuesta como string en busca de patrones de ID");
          // Buscar patrones como "ID: 123" o "idNomina: 123"
          const idPatterns = [
            /id[\s:]?(\d+)/i,
            /nomina[\s#:]?(\d+)/i,
            /creado[\sa-z]*[\s:]?(\d+)/i
          ];
          
          for (const pattern of idPatterns) {
            const match = response.data.match(pattern);
            if (match && match[1]) {
              idNomina = parseInt(match[1]);
              console.log(`ID encontrado con patrón ${pattern}:`, idNomina);
              break;
            }
          }
        }
      }
      
      if (!idNomina) {
        console.error("No se pudo obtener el ID de la nómina recién creada");
        console.error("Estructura de la respuesta:", JSON.stringify(response.data, null, 2));
        
        // Intentar verificar si la nómina fue creada buscándola en el servidor
        console.log("Intentando verificar si la nómina fue creada mediante búsqueda...");
        try {
          // Esperar un momento para dar tiempo a que se complete la transacción en el servidor
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Usar nuestra función de verificación para buscar la nómina recién creada
          const nominaId = await verificarNominaCreada(nominaData.contratoIdContrato, nominaData.periodo);
          
          if (nominaId) {
            console.log("Se encontró la nómina mediante verificación:", nominaId);
            idNomina = nominaId;
            
            toast({
              title: "Nómina identificada",
              description: "Se ha identificado la nómina creada mediante búsqueda"
            });
          } else {
            // Si no se puede encontrar, usar un ID temporal
            const tempId = Date.now(); // Usar timestamp como ID temporal
            console.warn("Usando ID temporal para continuar:", tempId);
            idNomina = tempId;
            
            // Mostrar advertencia al usuario
            toast({
              variant: "warning",
              title: "Advertencia",
              description: "La nómina se creó pero no se pudo obtener su ID. Las apropiaciones y deducciones podrían no guardarse correctamente."
            });
          }
        } catch (verificationError) {
          console.error("Error durante la verificación de nómina creada:", verificationError);
          
          // Usar ID temporal como última opción
          const tempId = Date.now();
          console.warn("Usando ID temporal después de error de verificación:", tempId);
          idNomina = tempId;
          
          toast({
            variant: "warning",
            title: "Advertencia",
            description: "No se pudo verificar el ID de la nómina. Las apropiaciones y deducciones podrían no guardarse correctamente."
          });
        }
      }
      
      console.log("ID de nómina a utilizar:", idNomina);
      
      // Guardar las apropiaciones en la base de datos
      const apropiacionPromises = apropiaciones.map(item => {
        const apropiacionData = {
          tipoApropiacion: item.concepto,
          valor: parseFloat(item.valor),
          nominaIdNomina: idNomina,
          //descripcion: `Aporte de ${item.concepto} - ${item.porcentaje}%`
        };
        
        console.log("Enviando apropiación:", apropiacionData);
        // Envolver la petición en un try/catch para manejar errores individuales sin detener todo el proceso
        return axios.post("http://localhost:8080/apropiaciones", apropiacionData, config)
          .catch(error => {
            console.error(`Error al guardar apropiación ${item.concepto}:`, error);
            // Devolver un objeto de error que podamos identificar después
            return { error: true, item: item.concepto, errorDetails: error };
          });
      });
      
      // Guardar las deducciones en la base de datos
      const deduccionPromises = deducciones.map(item => {
        const deduccionData = {
          tipoDeduccion: item.concepto,
          valor: parseFloat(item.valor),
          nominaIdNomina: idNomina,
          descripcion: `Aporte de ${item.concepto} - ${item.porcentaje}%`
        };
        
        console.log("Enviando deducción:", deduccionData);
        // Envolver la petición en un try/catch para manejar errores individuales sin detener todo el proceso
        return axios.post("http://localhost:8080/deducciones", deduccionData, config)
          .catch(error => {
            console.error(`Error al guardar deducción ${item.concepto}:`, error);
            // Devolver un objeto de error que podamos identificar después
            return { error: true, item: item.concepto, errorDetails: error };
          });
      });
      
      // Ejecutar todas las peticiones y mostrar mensaje específico para cada error
      const resultados = await Promise.all([...apropiacionPromises, ...deduccionPromises]);
      
      // Filtrar resultados para identificar los que fallaron
      const errores = resultados.filter(res => res.error === true);
      
      if (errores.length > 0) {
        // Crear un mensaje específico con los elementos que fallaron
        const elementosFallidos = errores.map(err => err.item).join(", ");
        
        console.error(`Errores al guardar ${errores.length} elementos:`, errores);
        toast({
          variant: "warning",
          title: "Atención",
          description: `La nómina se registró pero hubo problemas al guardar: ${elementosFallidos}`
        });
      } else {
        console.log("Apropiaciones y deducciones guardadas correctamente");
      }
      
      // Mostrar mensaje de éxito, indicando si hubo elementos que no se guardaron
      if (errores.length === 0) {
        toast({
          title: "Nómina registrada",
          description: "La nómina, apropiaciones y deducciones han sido registradas exitosamente"
        });
      } else {
        toast({
          title: "Nómina registrada",
          description: "La nómina fue registrada, pero algunos conceptos no pudieron guardarse."
        });
      }
      
      // Actualizar el contexto de nóminas si es necesario
      if (setPayrolls) {
        try {
          // Obtener las nóminas actualizadas
          const payrollsResponse = await axios.get("http://localhost:8080/nominas");
          if (payrollsResponse.data) {
            setPayrolls(payrollsResponse.data);
          }
        } catch (error) {
          console.error("Error al actualizar lista de nóminas:", error);
        }
      }
      
      // Limpiar formulario
      setForm({
        periodo: "",
        horasExtras: "0",
        diasTrabajados: "30",
      });
      setSelectedContractId("");
      setApropiacion([
        { concepto: "Salud", porcentaje: 8.5, valor: 0 },
        { concepto: "Pensión", porcentaje: 12, valor: 0 },
        { concepto: "ARL", porcentaje: 0.52, valor: 0 }
      ]);
      setDeducciones([
        { concepto: "Salud", porcentaje: 4, valor: 0 },
        { concepto: "Pensión", porcentaje: 4, valor: 0 }
      ]);
      setActiveTab("datos-basicos");
    } catch (error) {
      console.error("Error al registrar nómina:", error);
      
      // Extraer información detallada del error para ayudar en la depuración
      let errorMessage = "No se pudo registrar la nómina. Intenta nuevamente.";
      let errorDetails = {};
      
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Código de estado:", error.response.status);
        console.error("Datos del error:", error.response.data);
        
        errorDetails = {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        };
        
        if (error.response.status === 500) {
          errorMessage = "Error interno del servidor (500). Posibles causas:";
          
          // Verificar mensaje específico sobre contrato no encontrado
          const errorData = error.response.data;
          const errorText = typeof errorData === 'string' ? errorData : 
                           (errorData && errorData.message) ? errorData.message : 
                           JSON.stringify(errorData);
          
          // Verificar si es el error específico de contrato no encontrado
          if (errorText && errorText.includes("No se encontró contrato con ID")) {
            errorMessage = `Error: No se encontró el contrato seleccionado. Por favor, selecciona otro contrato válido.`;
            // Redirigir al usuario a la pestaña de datos básicos para seleccionar otro contrato
            setActiveTab("datos-basicos");
          } else if (errorText && errorText.includes("No se pudo obtener el ID de la nómina")) {
            // Error específico relacionado con el formato de respuesta del servidor
            errorMessage = "Error en formato de respuesta: No se pudo obtener el ID de la nómina recién creada. " +
                          "La nómina puede haberse creado correctamente, pero no se pudieron asociar las apropiaciones y deducciones.";
            // Sugerencias para el equipo de desarrollo
            console.error("SUGERENCIA PARA DESARROLLADORES: Revisar la estructura de respuesta del endpoint POST /nominas");
            console.error("Se esperaba un objeto con propiedad idNomina o id_nomina, pero se recibió un formato diferente");
          } else if (errorText && errorText.includes("duplicate") && errorText.includes("periodo")) {
            // Error específico relacionado con un periodo duplicado (constraint UNIQUE)
            errorMessage = "Ya existe una nómina registrada para este período. Por favor, selecciona otro período.";
            setActiveTab("datos-basicos");
          } else if (errorText && (errorText.includes("apropiaciones") || errorText.includes("deducciones"))) {
            // Error específico relacionado con apropiaciones o deducciones
            errorMessage = `Error al guardar apropiaciones o deducciones: ${errorText}`;
          } else {
            // Agregamos posibles causas generales basadas en errores comunes con este endpoint
            errorMessage += "\n- Formato incorrecto de la fecha (debe ser YYYY-MM-DD)";
            errorMessage += "\n- ID de contrato inválido o inexistente";
            errorMessage += "\n- Problemas con el procedimiento almacenado en el servidor";
          }
          
          console.error("Datos enviados que causaron el error:", JSON.stringify(errorDetails, null, 2));
        } else if (error.response.data && typeof error.response.data === 'object') {
          // Extraer mensaje de error del backend si existe
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        errorMessage = "No se recibió respuesta del servidor. Verifica la conexión.";
        errorDetails = { request: "Request sent but no response received" };
      } else {
        // Error en la configuración de la solicitud
        errorMessage = `Error al configurar la solicitud: ${error.message}`;
        errorDetails = { message: error.message };
      }
      
      console.error("Detalles completos del error:", errorDetails);
      
      toast({
        variant: "destructive",
        title: "Error al registrar nómina",
        description: errorMessage
      });
      
      // Mostrar alerta adicional para errores 500 con más detalles
      if (error.response && error.response.status === 500) {
        toast({
          variant: "destructive",
          title: "Recomendación",
          description: "Verifica que el contrato seleccionado sea válido y que la fecha tenga el formato correcto (YYYY-MM-DD)"
        });
      }
    }
  };

  return (
    <div className="container mx-auto py-4 md:py-6 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Registrar nueva nómina</h1>
      
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="px-4 md:px-6">
          <CardTitle>Formulario de registro</CardTitle>
          <CardDescription>
            Complete los campos necesarios para registrar una nueva nómina
          </CardDescription>
        </CardHeader>
        
        <Alert className="mx-6 mb-2">
          <Info className="h-4 w-4" />
          <AlertTitle>Cálculo y Almacenamiento</AlertTitle>
          <AlertDescription>
            Sólo necesita ingresar los datos básicos y ajustar las apropiaciones y deducciones si es necesario. 
            El sistema calculará automáticamente el auxilio de transporte, retención en la fuente y pago total.
            Todas las apropiaciones y deducciones configuradas serán guardadas en la base de datos.
          </AlertDescription>
        </Alert>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 md:px-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="datos-basicos" className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-2">
                Datos básicos
              </TabsTrigger>
              <TabsTrigger value="apropiaciones" className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-2">
                Apropiaciones
              </TabsTrigger>
              <TabsTrigger value="deducciones" className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-2">
                Deducciones
              </TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-6">
            <TabsContent value="datos-basicos">
              <div className="grid w-full items-center gap-4">
                {/* Selección de contrato */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Contrato <span className="text-red-500">*</span></Label>
                  <Select 
                    value={selectedContractId} 
                    onValueChange={handleContractChange}
                    required
                  >
                    <SelectTrigger className={selectedContractId ? "" : "border-red-300"}>
                      <SelectValue placeholder="Seleccione un contrato" />
                    </SelectTrigger>
                    <SelectContent>
                      {contracts.length > 0 ? (
                        contracts.map((contract) => {
                          const employee = employees.find(
                            (e) => e.idEmpleado === contract.empleadoIdEmpleado
                          );
                          return (
                            <SelectItem 
                              key={contract.idContrato} 
                              value={String(contract.idContrato)}
                            >
                              {employee
                                ? `${employee.nombre} - Contrato #${contract.idContrato}`
                                : `Contrato #${contract.idContrato}`}
                            </SelectItem>
                          );
                        })
                      ) : (
                        <SelectItem value="no-contratos" disabled>
                          No hay contratos disponibles
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {!selectedContractId && (
                    <p className="text-xs text-red-500 mt-1">Debes seleccionar un contrato</p>
                  )}
                </div>
                
                {/* Mostrar datos del empleado seleccionado */}
                {selectedEmployee && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-sm md:text-base">Empleado: {selectedEmployee.nombre}</p>
                    <p className="text-xs md:text-sm text-gray-500">Documento: {selectedEmployee.numeroDocumento}</p>
                    {selectedContract && (
                      <p className="text-xs md:text-sm text-gray-500">Salario base: ${parseFloat(selectedContract.salario).toLocaleString('es-CO')}</p>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label>Período <span className="text-red-500">*</span></Label>
                    <Input
                      type="date"
                      name="periodo"
                      value={form.periodo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label>Días trabajados <span className="text-red-500">*</span></Label>
                    <Input
                      type="number"
                      name="diasTrabajados"
                      value={form.diasTrabajados}
                      onChange={handleInputChange}
                      min="0"
                      max="31"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label>Horas extras</Label>
                  <Input
                    type="number"
                    name="horasExtras"
                    value={form.horasExtras}
                    onChange={handleInputChange}
                    min="0"
                    step="0.5"
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mt-2">
                  <div className="flex items-start">
                    <Calculator className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium text-blue-700">Cálculos automáticos</p>
                      <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
                        <li>El auxilio de transporte se calculará automáticamente según el salario base</li>
                        <li>La retención en la fuente se calculará según la función fn_calcular_ret_fuente</li>
                        <li>El pago total se determinará con la función fn_calcularPagoTotal</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("apropiaciones")} 
                    disabled={!selectedContractId}
                    className="w-full sm:w-auto"
                  >
                    Continuar a Apropiaciones
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="apropiaciones">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Apropiaciones de la empresa</h3>
                <p className="text-sm text-gray-500">
                  Registre los conceptos que la empresa debe asumir para el empleado
                </p>
                
                <div className="border rounded-md overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-2 px-2 md:px-4 text-left">Concepto</th>
                        <th className="py-2 px-2 md:px-4 text-right">Porcentaje (%)</th>
                        <th className="py-2 px-2 md:px-4 text-right">Valor ($)</th>
                        <th className="py-2 px-2 md:px-4 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apropiaciones.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-base">{item.concepto}</td>
                          <td className="py-2 px-2 md:px-4 text-right text-xs md:text-base">{item.porcentaje}%</td>
                          <td className="py-2 px-2 md:px-4 text-right text-xs md:text-base">${parseFloat(item.valor).toLocaleString('es-CO')}</td>
                          <td className="py-2 px-2 md:px-4 text-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteApropiacion(index)}
                              className="h-6 w-6 md:h-8 md:w-8 text-red-500"
                            >
                              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      
                      {/* Fila para agregar nueva apropiación */}
                      <tr>
                        <td className="py-2 px-2 md:px-4">
                          <Input 
                            className="text-xs md:text-base"
                            placeholder="Nuevo concepto"
                            value={nuevaApropiacion.concepto}
                            onChange={(e) => setNuevaApropiacion({...nuevaApropiacion, concepto: e.target.value})}
                          />
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          <Input 
                            className="text-xs md:text-base"
                            type="number"
                            placeholder="% del salario"
                            value={nuevaApropiacion.porcentaje}
                            onChange={(e) => setNuevaApropiacion({...nuevaApropiacion, porcentaje: e.target.value})}
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          {selectedContract ? (
                            <div className="text-right text-gray-500 text-xs md:text-base">
                              {nuevaApropiacion.porcentaje 
                                ? `$${(parseFloat(selectedContract.salario) * parseFloat(nuevaApropiacion.porcentaje || 0) / 100).toLocaleString('es-CO')}`
                                : "$0"
                              }
                            </div>
                          ) : (
                            <Input 
                              className="text-xs md:text-base"
                              type="number"
                              placeholder="Valor"
                              value={nuevaApropiacion.valor}
                              onChange={(e) => setNuevaApropiacion({...nuevaApropiacion, valor: e.target.value})}
                            />
                          )}
                        </td>
                        <td className="py-2 px-2 md:px-4 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleAddApropiacion}
                            className="h-6 w-6 md:h-8 md:w-8 text-green-500"
                          >
                            <Plus className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 md:px-4 font-medium text-xs md:text-base" colSpan="2">Total</td>
                        <td className="py-2 px-2 md:px-4 text-right font-medium text-xs md:text-base">${parseFloat(totalApropiaciones).toLocaleString('es-CO')}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("datos-basicos")}
                    className="w-full sm:w-auto"
                  >
                    Volver a Datos Básicos
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("deducciones")}
                    className="w-full sm:w-auto"
                  >
                    Continuar a Deducciones
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deducciones">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Deducciones del empleado</h3>
                <p className="text-sm text-gray-500">
                  Registre los conceptos que se deducen del salario del empleado
                </p>
                
                <div className="border rounded-md overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-2 px-2 md:px-4 text-left">Concepto</th>
                        <th className="py-2 px-2 md:px-4 text-right">Porcentaje (%)</th>
                        <th className="py-2 px-2 md:px-4 text-right">Valor ($)</th>
                        <th className="py-2 px-2 md:px-4 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deducciones.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-2 md:px-4 text-xs md:text-base">{item.concepto}</td>
                          <td className="py-2 px-2 md:px-4 text-right text-xs md:text-base">{item.porcentaje}%</td>
                          <td className="py-2 px-2 md:px-4 text-right text-xs md:text-base">${parseFloat(item.valor).toLocaleString('es-CO')}</td>
                          <td className="py-2 px-2 md:px-4 text-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteDeduccion(index)}
                              className="h-6 w-6 md:h-8 md:w-8 text-red-500"
                            >
                              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      
                      {/* Fila para agregar nueva deducción */}
                      <tr>
                        <td className="py-2 px-2 md:px-4">
                          <Input 
                            className="text-xs md:text-base"
                            placeholder="Nuevo concepto"
                            value={nuevaDeduccion.concepto}
                            onChange={(e) => setNuevaDeduccion({...nuevaDeduccion, concepto: e.target.value})}
                          />
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          <Input 
                            className="text-xs md:text-base"
                            type="number"
                            placeholder="% del salario"
                            value={nuevaDeduccion.porcentaje}
                            onChange={(e) => setNuevaDeduccion({...nuevaDeduccion, porcentaje: e.target.value})}
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          {selectedContract ? (
                            <div className="text-right text-gray-500 text-xs md:text-base">
                              {nuevaDeduccion.porcentaje 
                                ? `$${(parseFloat(selectedContract.salario) * parseFloat(nuevaDeduccion.porcentaje || 0) / 100).toLocaleString('es-CO')}`
                                : "$0"
                              }
                            </div>
                          ) : (
                            <Input 
                              className="text-xs md:text-base"
                              type="number"
                              placeholder="Valor"
                              value={nuevaDeduccion.valor}
                              onChange={(e) => setNuevaDeduccion({...nuevaDeduccion, valor: e.target.value})}
                            />
                          )}
                        </td>
                        <td className="py-2 px-2 md:px-4 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleAddDeduccion}
                            className="h-6 w-6 md:h-8 md:w-8 text-green-500"
                          >
                            <Plus className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-2 md:px-4 font-medium text-xs md:text-base" colSpan="2">Total</td>
                        <td className="py-2 px-2 md:px-4 text-right font-medium text-xs md:text-base">${parseFloat(totalDeducciones).toLocaleString('es-CO')}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-medium">Resumen</h3>
                  
                  <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Información importante</AlertTitle>
                    <AlertDescription>
                      Los valores de la nómina se calcularán automáticamente por el servidor al registrar 
                      la nómina utilizando las funciones fn_calcularPagoTotal y fn_calcular_ret_fuente.
                      Las apropiaciones y deducciones se guardarán con los valores calculados en este formulario.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-blue-500">
                      <span>Total apropiaciones (empresa):</span>
                      <span className="font-medium">${parseFloat(totalApropiaciones).toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Total deducciones (empleado):</span>
                      <span className="font-medium">${parseFloat(totalDeducciones).toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("apropiaciones")}
                    className="w-full sm:w-auto"
                  >
                    Volver a Apropiaciones
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Registrar Nómina y Guardar Datos
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
