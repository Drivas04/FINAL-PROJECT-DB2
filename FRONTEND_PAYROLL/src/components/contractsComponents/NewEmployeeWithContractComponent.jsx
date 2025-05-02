import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "@/hooks/useForm";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const NewEmployeeWithContractComponent = ({ onContractCreated }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const initialForm = {
    // Datos del empleado
    numero_documento: "",
    nombre: "",
    tipo_documento: "",
    fecha_nacimiento: "",
    correo: "",
    telefono: "",
    direccion: "",
    
    // Datos del contrato
    tipo_contrato: "",
    cargo: "",
    fecha_inicio: "",
    fecha_fin: "",
    salario: "",
    estado: "Activo",
  };

  const { formState, setFormState, onInputChange, onNumberInputChange } = useForm(initialForm);

  const {
    numero_documento,
    nombre,
    tipo_documento,
    fecha_nacimiento,
    correo,
    telefono,
    direccion,
    tipo_contrato,
    cargo,
    fecha_inicio,
    fecha_fin,
    salario,
    estado,
  } = formState;

  const handleCreateContract = async () => {
    // Validar los campos del empleado y del contrato
    if (
      !numero_documento ||
      !nombre ||
      !tipo_documento ||
      !fecha_nacimiento ||
      !correo ||
      !telefono ||
      !direccion ||
      !tipo_contrato ||
      !cargo ||
      !fecha_inicio ||
      !salario
    ) {
      toast({ description: "Por favor, complete todos los campos requeridos." });
      return;
    }

    // Estructura de los datos a enviar
    const newEmployeeAndContract = {
      empleado: {
        numero_documento,
        nombre,
        tipo_documento,
        fecha_nacimiento,
        correo,
        telefono,
        direccion,
      },
      contrato: {
        tipo_contrato,
        cargo,
        fecha_inicio,
        fecha_fin: tipo_contrato === "Indefinido" ? null : fecha_fin,
        salario: Number(salario),
        estado,
      },
    };

    try {
      // Enviar los datos al backend
      await axios.post("/api/contratos", newEmployeeAndContract);

      // Limpiar el formulario
      setFormState(initialForm);

      // Navegar a la lista de contratos o hacer alguna otra acción
      navigate("/contratos");

      toast({ description: "Empleado y contrato creados exitosamente." });
    } catch (error) {
      toast({ description: "Error al crear el empleado y el contrato." });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del empleado y contrato</CardTitle>
        <CardDescription>Ingrese los datos completos del nuevo empleado y contrato</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Tabs defaultValue="empleado">
          <TabsList className="flex space-x-2">
            <TabsTrigger value="empleado">Empleado</TabsTrigger>
            <TabsTrigger value="contrato">Contrato</TabsTrigger>
          </TabsList>

          <TabsContent value="empleado">
            {/* Campos de datos del empleado */}
            <div className="space-y-1">
              <Label htmlFor="numero_documento">Número de documento</Label>
              <Input
                name="numero_documento"
                value={numero_documento}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input name="nombre" value={nombre} onChange={onInputChange} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tipo_documento">Tipo de documento</Label>
              <Select
                name="tipo_documento"
                value={tipo_documento}
                onValueChange={(value) => setFormState({ ...formState, tipo_documento: value })}
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
          </TabsContent>

          <TabsContent value="contrato">
            {/* Campos de datos del contrato */}
            <div className="space-y-1">
              <Label htmlFor="tipo_contrato">Tipo de contrato</Label>
              <Select
                name="tipo_contrato"
                value={tipo_contrato}
                onValueChange={(value) => setFormState({ ...formState, tipo_contrato: value })}
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
              <Input name="cargo" value={cargo} onChange={onInputChange} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
              <Input
                type="date"
                name="fecha_inicio"
                value={fecha_inicio}
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
                disabled={tipo_contrato === "Indefinido"}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="salario">Salario</Label>
              <Input
                type="number"
                name="salario"
                value={salario}
                onChange={onNumberInputChange}
                required
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCreateContract}>Crear contrato</Button>
      </CardFooter>
    </Card>
  );
};
