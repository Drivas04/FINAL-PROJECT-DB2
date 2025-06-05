"use client"
 
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@/hooks/useForm";
import { useDataContext } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";

export const NewContractComponent = ({ employeeData, onContractSubmit }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const initialForm = {
    tipoContrato: "",
    nombreCargo: "",
    fechaInicio: new Date().toISOString().split("T")[0], // Fecha actual por defecto
    fechaFin: "",
    salario: "",
    estado: "Activo",
  };

  const { formState, setFormState, onInputChange, onNumberInputChange } = useForm(initialForm);

  const { tipoContrato, nombreCargo, fechaInicio, fechaFin, salario, estado } = formState;

  const handleCreateContract = () => {
    // Validar campos requeridos
    if (!tipoContrato || !nombreCargo || !salario) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Por favor completa todos los campos requeridos",
      });
      return;
    }

    // Si es contrato indefinido, fecha_fin debe ser null
    const finalData = {
      ...formState,
      fechaFin: tipoContrato === "Indefinido" ? null : fechaFin,
      salario: Number(salario)
    };

    // Enviar los datos al componente padre
    onContractSubmit(finalData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del contrato</CardTitle>
        <CardDescription>
          Ingrese los datos del contrato para {employeeData?.nombre || "el nuevo empleado"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="tipoContrato">Tipo de contrato</Label>
          <Select
            name="tipoContrato"
            value={tipoContrato}
            onValueChange={(value) => {
              setFormState({ ...formState, tipoContrato: value });
            }}
            onChange={onInputChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el tipo de contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Fijo">Fijo</SelectItem>
                <SelectItem value="Indefinido">Indefinido</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="nombreCargo">Cargo</Label>
          <Input
            name="nombreCargo"
            value={nombreCargo}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="fechaInicio">Fecha de inicio</Label>
          <Input
            type="date"
            name="fechaInicio"
            value={fechaInicio}
            onChange={onInputChange}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="fechaFin">Fecha de finalización</Label>
          <Input
            type="date"
            name="fechaFin"
            value={fechaFin}
            onChange={onInputChange}
            disabled={tipoContrato === "Indefinido" ? true : false}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="salario">Salario</Label>
          <Input
            type="number"
            min="0"
            name="salario"
            value={salario}
            onChange={onNumberInputChange}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"
              ];
          
              if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCreateContract}>Crear contrato</Button>
      </CardFooter>
    </Card>
  );
};
