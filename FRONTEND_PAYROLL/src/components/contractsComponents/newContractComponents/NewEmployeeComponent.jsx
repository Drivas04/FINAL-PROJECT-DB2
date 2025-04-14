import React, { useEffect, useState } from "react";

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
import { employees } from "@/data/employees";
import { de, id } from "date-fns/locale";
import { useDataContext } from "@/context/DataContext";



export const NewEmployeeComponent = ({defaultTab, onEmployeeAdded}) => {

  const {addEmployee} = useDataContext();

  

  const initialForm = {
    numero_documento: "",
    nombre: "",
    tipo_documento: "",
    fecha_nacimiento: "",
    correo: "",
    telefono: "",
    direccion: "",
  };

  const { formState, setFormState, onInputChange } = useForm(initialForm);

  const {
    numero_documento,
    nombre,
    tipo_documento,
    fecha_nacimiento,
    correo,
    telefono,
    direccion,
  } = formState;

  const handleSaveChanges = () => {
      const newEmployee = {
        numero_documento,
        nombre,
        tipo_documento,
        fecha_nacimiento,
        correo,
        telefono,
        direccion,
        fecha_contratacion: new Date().toISOString().split("T")[0],
        id_departamento: 1,
      };

      const employeeId = addEmployee(newEmployee);


    setFormState({
      numero_documento: "",
      nombre: "",
      tipo_documento: "",
      fecha_nacimiento: "",
      correo: "",
      telefono: "",
      direccion: "",
    });
    if(onEmployeeAdded){
      onEmployeeAdded(employeeId);
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del empleado</CardTitle>
        <CardDescription>
          Ingrese los datos personales del nuevo empleado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="numero_documento">Número de documento</Label>
          <Input
            name="numero_documento"
            value={numero_documento}
            onChange={onInputChange}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"
              ];
          
              if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="tipo_documento">Tipo de documento</Label>
          <Select
            name="tipo_documento"
            value={tipo_documento}
            required
            onValueChange={(value) => {
              setFormState({ ...formState, tipo_documento: value });
            }}
            onChange={onInputChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="CC">CC</SelectItem>
                <SelectItem value="CE">CE</SelectItem>
                <SelectItem value="Pasaporte">Pasaporte</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
          <Input
            type="date"
            name="fecha_nacimiento"
            value={fecha_nacimiento}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="correo">Correo</Label>
          <Input
            type="email"
            name="correo"
            value={correo}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            name="telefono"
            value={telefono}
            onChange={onInputChange}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"
              ];
          
              if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            name="direccion"
            value={direccion}
            onChange={onInputChange}
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges}>Guardar datos</Button>
      </CardFooter>
    </Card>
  );
};