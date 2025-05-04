import React, { useState, useEffect } from 'react';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useSearch from "@/hooks/useSearch";
import { format } from "date-fns";
import { CiUser } from "react-icons/ci";
import { FiFileText } from "react-icons/fi";
import axios from 'axios';
import { useDataContext } from "@/context/DataContext";

export const RegisterNewsForm = () => {
  const { toast } = useToast();
  const { employeeContext, payrollContext } = useDataContext();
  
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [employeePayrolls, setEmployeePayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form state for new payroll news
  const [newsData, setNewsData] = useState({
    tipo_novedad: '',
    descripcion: '',
    fecha_inicio: format(new Date(), 'yyyy-MM-dd'),
    fecha_fin: '',
    valorAfectacion: 0,
    id_nomina: ''
  });
  
  // Initialize search functionality
  const { search, setSearch, filteredData: filteredEmployees } = useSearch(employees, "nombre");
  
  // Load employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/empleados');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los empleados"
        });
      }
    };
    
    fetchEmployees();
  }, []);
  
  // Function to handle employee selection
  const handleEmployeeSelect = async (employeeId) => {
    try {
      setLoading(true);
      const employee = employees.find(emp => emp.idEmpleado === employeeId);
      setSelectedEmployee(employee);
      
      // Get employee's payrolls
      const response = await axios.get(`http://localhost:8080/nominas/empleado/${employeeId}`);
      setEmployeePayrolls(response.data);
      
      setSearch("");
      setSelectedPayroll(null);
      setNewsData({...newsData, id_nomina: ''});
    } catch (error) {
      console.error('Error fetching employee payrolls:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las nóminas del empleado"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle payroll selection
  const handlePayrollChange = (payrollId) => {
    const payroll = employeePayrolls.find(p => p.idNomina === payrollId);
    setSelectedPayroll(payroll);
    setNewsData({...newsData, id_nomina: payrollId});
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData({...newsData, [name]: value});
  };
  
  // Handle number input specifically for monetary values
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData({...newsData, [name]: parseFloat(value) || 0});
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!newsData.tipo_novedad || !newsData.descripcion || !newsData.fecha_inicio || !newsData.id_nomina) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Por favor complete todos los campos obligatorios"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const payload = {
        tipo_novedad: newsData.tipo_novedad,
        descripcion: newsData.descripcion,
        fecha_inicio: newsData.fecha_inicio,
        fecha_fin: newsData.fecha_fin || null,
        valorAfectacion: newsData.valorAfectacion,
        id_nomina: newsData.id_nomina
      };
      
      const response = await axios.post('http://localhost:8080/novedades', payload);
      
      toast({
        title: "Novedad registrada",
        description: "La novedad ha sido registrada exitosamente"
      });
      
      // Reset form
      setNewsData({
        tipo_novedad: '',
        descripcion: '',
        fecha_inicio: format(new Date(), 'yyyy-MM-dd'),
        fecha_fin: '',
        valorAfectacion: 0,
        id_nomina: ''
      });
      setSelectedEmployee(null);
      setSelectedPayroll(null);
      setEmployeePayrolls([]);
      
    } catch (error) {
      console.error('Error registering payroll news:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo registrar la novedad"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl flex items-center justify-center">
          <FiFileText className="mr-2" />
          Registrar Novedad de Nómina
        </CardTitle>
        <CardDescription className="text-center">
          Busque el empleado, seleccione la nómina y registre la novedad
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Empleado search section */}
        <div className="space-y-4">
          <h3 className="font-semibold">1. Buscar empleado</h3>
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar empleado por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            {search && (
              <div className="absolute w-full mt-1 border rounded-md max-h-60 overflow-y-auto bg-white shadow z-10">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <div
                      key={emp.idEmpleado}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleEmployeeSelect(emp.idEmpleado)}
                    >
                      {emp.nombre} {emp.apellido ? emp.apellido : ''} - {emp.numeroDocumento}
                    </div>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">No se encontraron empleados</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {selectedEmployee && (
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium">Empleado seleccionado:</h4>
            <p>{selectedEmployee.nombre} {selectedEmployee.apellido || ''} - {selectedEmployee.numeroDocumento}</p>
          </div>
        )}
        
        {/* Payroll selection section */}
        {selectedEmployee && employeePayrolls.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">2. Seleccionar nómina</h3>
            <Select 
              onValueChange={handlePayrollChange}
              value={newsData.id_nomina}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un período de nómina" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {employeePayrolls.map((payroll) => (
                    <SelectItem key={payroll.idNomina} value={payroll.idNomina}>
                      {payroll.periodo || `Nómina #${payroll.idNomina}`} - {payroll.fechaGeneracion && format(new Date(payroll.fechaGeneracion), 'dd/MM/yyyy')}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {selectedEmployee && employeePayrolls.length === 0 && (
          <div className="text-center p-4 bg-yellow-50 rounded-md">
            <p className="text-yellow-700">Este empleado no tiene nóminas registradas</p>
          </div>
        )}
        
        {/* Payroll news form */}
        {selectedPayroll && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">3. Ingresar información de la novedad</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo_novedad">Tipo de novedad *</Label>
                <Select
                  name="tipo_novedad"
                  value={newsData.tipo_novedad}
                  onValueChange={(value) => setNewsData({...newsData, tipo_novedad: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de novedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Incapacidad">Incapacidad</SelectItem>
                      <SelectItem value="Vacaciones">Vacaciones</SelectItem>
                      <SelectItem value="Licencia">Licencia</SelectItem>
                      <SelectItem value="Horas extras">Horas extras</SelectItem>
                      <SelectItem value="Bonificación">Bonificación</SelectItem>
                      <SelectItem value="Auxilio de transporte">Auxilio de transporte</SelectItem>
                      <SelectItem value="Descuento">Descuento</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valorAfectacion">Valor de afectación *</Label>
                <Input
                  type="number"
                  name="valorAfectacion"
                  value={newsData.valorAfectacion}
                  onChange={handleNumberInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción *</Label>
              <Textarea
                name="descripcion"
                value={newsData.descripcion}
                onChange={handleInputChange}
                placeholder="Detalles de la novedad"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha_inicio">Fecha de inicio *</Label>
                <Input
                  type="date"
                  name="fecha_inicio"
                  value={newsData.fecha_inicio}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fecha_fin">Fecha de finalización</Label>
                <Input
                  type="date"
                  name="fecha_fin"
                  value={newsData.fecha_fin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}
        
        {!selectedEmployee && !selectedPayroll && (
          <div className="flex flex-col items-center justify-center p-10 text-gray-500">
            <CiUser className="text-6xl mb-2" />
            <p>Busque y seleccione un empleado para comenzar</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end">
        {selectedPayroll && (
          <Button 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Novedad"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};