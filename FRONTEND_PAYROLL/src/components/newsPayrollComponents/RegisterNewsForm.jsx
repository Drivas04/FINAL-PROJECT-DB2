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
    tipoNovedad: '',
    descripcion: '',
    fechaInicio: format(new Date(), 'yyyy-MM-dd'),
    fechaFin: format(new Date(), 'yyyy-MM-dd'),
    nominaIdNomina: ''
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
    setNewsData({...newsData, nominaIdNomina: payrollId});
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData({...newsData, [name]: value});
  };
  
  
  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!newsData.tipoNovedad  || !newsData.fechaInicio || !newsData.fechaFin || !newsData.nominaIdNomina) {
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
        tipoNovedad: newsData.tipoNovedad,
        descripcion: newsData.descripcion,
        fechaInicio: newsData.fechaInicio,
        fechaFin: newsData.fechaFin,
        nominaIdNomina: newsData.nominaIdNomina
      };
      
      const response = await axios.post('http://localhost:8080/novedades', payload);
      
      toast({
        title: "Novedad registrada",
        description: "La novedad ha sido registrada exitosamente"
      });
      
      // Reset form
      setNewsData({
        tipoNovedad: '',
        descripcion: '',
        fechainicio: format(new Date(), 'yyyy-MM-dd'),
        fechaFin: '',
        nominaIdNomina: ''
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
              value={newsData.nominaIdNomina}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un período de nómina" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {employeePayrolls.map((payroll) => (
                    <SelectItem key={payroll.idNomina} value={payroll.idNomina}>
                      {payroll.periodo || `Nómina #${payroll.idNomina}`}
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
                <Label htmlFor="tipoNovedad">Tipo de novedad *</Label>
                <Select
                  name="tipoNovedad"
                  value={newsData.tipoNovedad}
                  onValueChange={(value) => setNewsData({...newsData, tipoNovedad: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de novedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Incapacidad">Incapacidad</SelectItem>
                      <SelectItem value="Vacaciones">Vacaciones</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="fechaInicio">Fecha de inicio *</Label>
                <Input
                  type="date"
                  name="fechaInicio"
                  value={newsData.fechaInicio}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha de finalización</Label>
                <Input
                  type="date"
                  name="fechaFin"
                  value={newsData.fechaFin}
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