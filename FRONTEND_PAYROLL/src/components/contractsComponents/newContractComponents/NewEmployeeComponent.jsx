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

export const NewEmployeeComponent = ({ onEmployeeDataSaved }) => {
  const initialForm = {
    numeroDocumento: "",
    nombre: "",
    tipoDocumento: "",
    fechaNacimiento: "",
    correo: "",
    telefono: "",
    direccion: "",
    epsEmpleado: "Compensar",
    departamentoIdDepartamento: 1,
    cuentabancariaNumeroCuenta: "",
    bancoIdBanco: 1,
  };

  const { formState, setFormState, onInputChange } = useForm(initialForm);

  const {
    numeroDocumento,
    nombre,
    tipoDocumento,
    fechaNacimiento,
    correo,
    telefono,
    direccion,
    epsEmpleado,
    departamentoIdDepartamento,
    cuentabancariaNumeroCuenta,
    bancoIdBanco,
  } = formState;

  const handleSaveChanges = () => {
    // Validar campos requeridos
    if (!numeroDocumento || !nombre || !tipoDocumento || !fechaNacimiento || !correo || !telefono || !direccion) {
      // Mostrar error o mensaje de validación
      return;
    }

    // Enviamos los datos al componente padre
    if (onEmployeeDataSaved) {
      onEmployeeDataSaved(formState);
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
          <Label htmlFor="numeroDocumento">Número de documento</Label>
          <Input
            name="numeroDocumento"
            value={numeroDocumento}
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
          <Label htmlFor="tipoDocumento">Tipo de documento</Label>
          <Select
            name="tipoDocumento"
            value={tipoDocumento}
            required
            onValueChange={(value) => {
              setFormState({ ...formState, tipoDocumento: value });
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
          <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
          <Input
            type="date"
            name="fechaNacimiento"
            value={fechaNacimiento}
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
        <div className="space-y-1">
          <Label htmlFor="epsEmpleado">EPS</Label>
          <Select
            name="epsEmpleado"
            value={epsEmpleado}
            onValueChange={(value) => {
              setFormState({ ...formState, epsEmpleado: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona la EPS" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Compensar">Compensar</SelectItem>
                <SelectItem value="Sura">Sura</SelectItem>
                <SelectItem value="Nueva EPS">Nueva EPS</SelectItem>
                <SelectItem value="Sanitas">Sanitas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="departamentoIdDepartamento">Departamento</Label>
          <Select
            name="departamentoIdDepartamento"
            value={departamentoIdDepartamento}
            onValueChange={(value) => {
              setFormState({ ...formState, departamentoIdDepartamento: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona la EPS" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Compensar</SelectItem>
                <SelectItem value="2">Sura</SelectItem>
                <SelectItem value="3">Nueva EPS</SelectItem>
                <SelectItem value="4">Sanitas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="cuentabancariaNumeroCuenta">Dirección</Label>
          <Input
            name="cuentabancariaNumeroCuenta"
            value={cuentabancariaNumeroCuenta}
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
          <Label htmlFor="bancoIdBanco">Banco</Label>
          <Select
            name="bancoIdBanco"
            value={bancoIdBanco}
            onValueChange={(value) => {
              setFormState({ ...formState, bancoIdBanco: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona la EPS" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Compensar</SelectItem>
                <SelectItem value="2">Sura</SelectItem>
                <SelectItem value="3">Nueva EPS</SelectItem>
                <SelectItem value="4">Sanitas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges}>Guardar datos</Button>
      </CardFooter>
    </Card>
  );
};