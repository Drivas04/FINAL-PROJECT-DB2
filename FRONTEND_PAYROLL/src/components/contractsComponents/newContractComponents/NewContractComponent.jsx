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

export const NewContractComponent = ({employeeId}) => {

  const { addContract} = useDataContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const initialForm = {
    tipo_contrato: "",
    cargo: "",
    fecha_inicio: "",
    fecha_fin: "",
    salario: "",
    estado: "Activo",
  };

  const { formState, setFormState, onInputChange, onNumberInputChange } = useForm(initialForm);

  const { tipo_contrato, cargo, fecha_inicio, fecha_fin, salario, estado } = formState;

  const handleCreateContract = () => {
    const newContract = {
      id_empleado: employeeId,
      tipo_contrato,
      cargo,
      fecha_fin: tipo_contrato === "Indefinido" ? null : fecha_fin,
      salario: Number(salario),
      estado
    };

    // Agregar contrato al contexto
    addContract(newContract);
    
    // Resetear formulario
    setFormState({
      tipo_contrato: "",
      cargo: "",
      fecha_inicio: "",
      fecha_fin: "",
      salario: "",
      estado: "Activo",
    });

    navigate("/contratos");

    toast({
      description: "El contrato se ha creado con exito",
    })

    
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del contrato</CardTitle>
        <CardDescription>
          Ingrese los datos del contrato del nuevo empleado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="tipo_contrato">Tipo de contrato</Label>
          <Select
            name="tipo_contrato"
            value={tipo_contrato}
            onValueChange={(value) => {
              setFormState({ ...formState, tipo_contrato: value });
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
          <Label htmlFor="cargo">Cargo</Label>
          <Input
            name="cargo"
            value={cargo}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="fecha_fin">Fecha de finalización</Label>
          <Input
            type="date"
            name="fecha_fin"
            value={fecha_fin}
            onChange={onInputChange}
            disabled={tipo_contrato === "Indefinido" ? true : false}
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
