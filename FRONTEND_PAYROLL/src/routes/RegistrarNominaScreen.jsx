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
import { CheckCircle, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
    ret_fuente: "",
    recargos: "",
    horas_extras: "",
    pago_total: "",
    auxilio_transporte: "",
    dias_trabajados: "",
  });

  // Estados para apropiaciones y deducciones
  const [apropiaciones, setApropiaciones] = useState([
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

  // Obtener el contrato seleccionado y su empleado asociado
  const selectedContract = contracts.find(
    (c) => String(c.idContrato) === String(selectedContractId)
  );
  const selectedEmployee = selectedContract
    ? employees.find((e) => e.idEmpleado === selectedContract.empleadoIdEmpleado)
    : null;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContractChange = (value) => {
    setSelectedContractId(value);
    
    // Si hay un contrato seleccionado, actualizar los valores de apropiaciones y deducciones
    if (value) {
      const contrato = contracts.find(c => String(c.idContrato) === String(value));
      if (contrato && contrato.salario) {
        const salarioBase = parseFloat(contrato.salario);
        
        // Actualizar valores de apropiaciones basados en el salario
        setApropiaciones(prevApropiaciones => 
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
    
    setApropiaciones([...apropiaciones, { 
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
    setApropiaciones(apropiaciones.filter((_, i) => i !== index));
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
    if (!selectedContractId) return;
    
    // Validar que estén completos los datos básicos
    if (!form.periodo || !form.pago_total || !form.dias_trabajados) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor completa los campos obligatorios en la sección de datos básicos"
      });
      setActiveTab("datos-basicos");
      return;
    }
    
    try {
      // Crear objeto completo con todas las secciones
      const nominaCompleta = {
        ...form,
        contrato_id_contrato: selectedContractId,
        apropiaciones: apropiaciones,
        deducciones: deducciones,
        total_apropiaciones: totalApropiaciones,
        total_deducciones: totalDeducciones
      };
      
      console.log("Enviando nómina:", nominaCompleta);
      
      // Aquí iría la llamada a la API para guardar la nómina
      // const response = await axios.post("http://localhost:8080/nominas", nominaCompleta);
      
      toast({
        title: "Nómina registrada",
        description: "La nómina ha sido registrada exitosamente"
      });
      
      // Limpiar formulario
      setForm({
        periodo: "",
        ret_fuente: "",
        recargos: "",
        horas_extras: "",
        pago_total: "",
        auxilio_transporte: "",
        dias_trabajados: "",
      });
      setSelectedContractId("");
      setApropiaciones([
        { concepto: "Salud", porcentaje: 8.5, valor: 0 },
        { concepto: "Pensión", porcentaje: 12, valor: 0 },
        { concepto: "ARL", porcentaje: 0.52, valor: 0 }
      ]);
      setDeducciones([
        { concepto: "Salud", porcentaje: 4, valor: 0 },
        { concepto: "Pensión", porcentaje: 4, valor: 0 }
      ]);
    } catch (error) {
      console.error("Error al registrar nómina:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo registrar la nómina. Intenta nuevamente."
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Registrar nueva nómina</h1>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Formulario de registro</CardTitle>
          <CardDescription>
            Complete todos los campos para registrar una nueva nómina para un empleado
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="datos-basicos" className="flex items-center gap-2">
                Datos básicos
              </TabsTrigger>
              <TabsTrigger value="apropiaciones" className="flex items-center gap-2">
                Apropiaciones
              </TabsTrigger>
              <TabsTrigger value="deducciones" className="flex items-center gap-2">
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
                  <Select value={selectedContractId} onValueChange={handleContractChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un contrato" />
                    </SelectTrigger>
                    <SelectContent>
                      {contracts.map((contract) => {
                        const employee = employees.find(
                          (e) => e.idEmpleado === contract.empleadoIdEmpleado
                        );
                        return (
                          <SelectItem key={contract.idContrato} value={String(contract.idContrato)}>
                            {employee
                              ? `${employee.nombre} - Contrato #${contract.idContrato}`
                              : `Contrato #${contract.idContrato}`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Mostrar datos del empleado seleccionado */}
                {selectedEmployee && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">Empleado: {selectedEmployee.nombre}</p>
                    <p className="text-sm text-gray-500">Documento: {selectedEmployee.numeroDocumento}</p>
                    {selectedContract && (
                      <p className="text-sm text-gray-500">Salario base: ${parseFloat(selectedContract.salario).toLocaleString('es-CO')}</p>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
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
                      name="dias_trabajados"
                      value={form.dias_trabajados}
                      onChange={handleInputChange}
                      min="0"
                      max="31"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label>Horas extras</Label>
                    <Input
                      type="number"
                      name="horas_extras"
                      value={form.horas_extras}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label>Recargos</Label>
                    <Input
                      type="number"
                      name="recargos"
                      value={form.recargos}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label>Retención en la fuente</Label>
                    <Input
                      type="number"
                      name="ret_fuente"
                      value={form.ret_fuente}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label>Auxilio de transporte</Label>
                    <Input
                      type="number"
                      name="auxilio_transporte"
                      value={form.auxilio_transporte}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label>Pago total <span className="text-red-500">*</span></Label>
                  <Input
                    type="number"
                    name="pago_total"
                    value={form.pago_total}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("apropiaciones")} 
                    disabled={!selectedContractId}
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
                
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-2 px-4 text-left">Concepto</th>
                        <th className="py-2 px-4 text-right">Porcentaje (%)</th>
                        <th className="py-2 px-4 text-right">Valor ($)</th>
                        <th className="py-2 px-4 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apropiaciones.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{item.concepto}</td>
                          <td className="py-2 px-4 text-right">{item.porcentaje}%</td>
                          <td className="py-2 px-4 text-right">${parseFloat(item.valor).toLocaleString('es-CO')}</td>
                          <td className="py-2 px-4 text-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteApropiacion(index)}
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      
                      {/* Fila para agregar nueva apropiación */}
                      <tr>
                        <td className="py-2 px-4">
                          <Input 
                            placeholder="Nuevo concepto"
                            value={nuevaApropiacion.concepto}
                            onChange={(e) => setNuevaApropiacion({...nuevaApropiacion, concepto: e.target.value})}
                          />
                        </td>
                        <td className="py-2 px-4">
                          <Input 
                            type="number"
                            placeholder="% del salario"
                            value={nuevaApropiacion.porcentaje}
                            onChange={(e) => setNuevaApropiacion({...nuevaApropiacion, porcentaje: e.target.value})}
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="py-2 px-4">
                          {selectedContract ? (
                            <div className="text-right text-gray-500">
                              {nuevaApropiacion.porcentaje 
                                ? `$${(parseFloat(selectedContract.salario) * parseFloat(nuevaApropiacion.porcentaje || 0) / 100).toLocaleString('es-CO')}`
                                : "$0"
                              }
                            </div>
                          ) : (
                            <Input 
                              type="number"
                              placeholder="Valor"
                              value={nuevaApropiacion.valor}
                              onChange={(e) => setNuevaApropiacion({...nuevaApropiacion, valor: e.target.value})}
                            />
                          )}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleAddApropiacion}
                            className="h-8 w-8 text-green-500"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 font-medium" colSpan="2">Total</td>
                        <td className="py-2 px-4 text-right font-medium">${parseFloat(totalApropiaciones).toLocaleString('es-CO')}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("datos-basicos")}
                  >
                    Volver a Datos Básicos
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("deducciones")}
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
                
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-2 px-4 text-left">Concepto</th>
                        <th className="py-2 px-4 text-right">Porcentaje (%)</th>
                        <th className="py-2 px-4 text-right">Valor ($)</th>
                        <th className="py-2 px-4 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deducciones.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{item.concepto}</td>
                          <td className="py-2 px-4 text-right">{item.porcentaje}%</td>
                          <td className="py-2 px-4 text-right">${parseFloat(item.valor).toLocaleString('es-CO')}</td>
                          <td className="py-2 px-4 text-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteDeduccion(index)}
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      
                      {/* Fila para agregar nueva deducción */}
                      <tr>
                        <td className="py-2 px-4">
                          <Input 
                            placeholder="Nuevo concepto"
                            value={nuevaDeduccion.concepto}
                            onChange={(e) => setNuevaDeduccion({...nuevaDeduccion, concepto: e.target.value})}
                          />
                        </td>
                        <td className="py-2 px-4">
                          <Input 
                            type="number"
                            placeholder="% del salario"
                            value={nuevaDeduccion.porcentaje}
                            onChange={(e) => setNuevaDeduccion({...nuevaDeduccion, porcentaje: e.target.value})}
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="py-2 px-4">
                          {selectedContract ? (
                            <div className="text-right text-gray-500">
                              {nuevaDeduccion.porcentaje 
                                ? `$${(parseFloat(selectedContract.salario) * parseFloat(nuevaDeduccion.porcentaje || 0) / 100).toLocaleString('es-CO')}`
                                : "$0"
                              }
                            </div>
                          ) : (
                            <Input 
                              type="number"
                              placeholder="Valor"
                              value={nuevaDeduccion.valor}
                              onChange={(e) => setNuevaDeduccion({...nuevaDeduccion, valor: e.target.value})}
                            />
                          )}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleAddDeduccion}
                            className="h-8 w-8 text-green-500"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 font-medium" colSpan="2">Total</td>
                        <td className="py-2 px-4 text-right font-medium">${parseFloat(totalDeducciones).toLocaleString('es-CO')}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-medium">Resumen</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total devengado:</span>
                      <span className="font-medium">${form.pago_total ? parseFloat(form.pago_total).toLocaleString('es-CO') : "0"}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Total deducciones:</span>
                      <span className="font-medium">${parseFloat(totalDeducciones).toLocaleString('es-CO')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Neto a pagar:</span>
                      <span>${(parseFloat(form.pago_total || 0) - parseFloat(totalDeducciones)).toLocaleString('es-CO')}</span>
                    </div>
                    
                    <div className="flex justify-between text-blue-500">
                      <span>Total apropiaciones (empresa):</span>
                      <span className="font-medium">${parseFloat(totalApropiaciones).toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("apropiaciones")}
                  >
                    Volver a Apropiaciones
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Registrar Nómina
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};
