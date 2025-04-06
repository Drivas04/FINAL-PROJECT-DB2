import React, { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { useForm } from "@/hooks/useForm";
import { DatePicker } from "@/components/ui/date-picker";

export const EditProfileComponent = ({ open, setOpen, employee, departmentName }) => {
  const initialForm = {
    cedula: employee.documento,
    tipo_documento: employee.tipo_documento,
    nombre: employee.nombre,
    telefono: employee.telefono,
    correo: employee.correo,
    fecha_nacimiento: employee.fecha_nacimiento,
    fecha_contratacion: employee.fecha_contratacion,
    id_departamento: employee.id_departamento,
  };

  const { formState, setFormState, onInputChange } = useForm(initialForm);

  const {
    cedula,
    tipo_documento,
    nombre,
    telefono,
    correo,
    fecha_nacimiento,
    fecha_contratacion,
    id_departamento,
  } = formState;

  useEffect(() => {
    if (employee) {
      setFormState({
        cedula: employee.documento || "",
        tipo_documento: employee.tipo_documento || "",
        nombre: employee.nombre || "",
        telefono: employee.telefono || "",
        correo: employee.correo || "",
        fecha_nacimiento: employee.fecha_nacimiento || "",
        fecha_contratacion: employee.fecha_contratacion || "",
        id_departamento: employee.id_departamento || "",
      });
    }
  }, [employee, setFormState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil de {employee.nombre}</DialogTitle>
          <DialogDescription>
            Haz los cambios necesarios aqui. Da click en "Guardar" para
            aplicar los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cedula" className="text-right">
              Cedula
            </Label>
            <Input
              disabled
              name="cedula"
              value={cedula}
              onChange={onInputChange}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipo_cedula" className="text-right">
              Tipo de documento
            </Label>
            <Select defaultValue={tipo_documento}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccione el tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CC">CC</SelectItem>
                  <SelectItem value="CE">CE</SelectItem>
                  <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                  <SelectItem value="TI">TI</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telefono" className="text-right">
              Teléfono
            </Label>
            <Input
              name="telefono"
              value={telefono}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="correo" className="text-right">
              Correo
            </Label>
            <Input
              name="correo"
              type="email"
              value={correo}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha_nacimiento" className="text-right">
              Fecha de nacimiento
            </Label>
            <div className="col-span-3">
              <DatePicker
                date={fecha_nacimiento}
                setDate={(date) =>
                  setFormState((prev) => ({
                    ...prev,
                    fecha_nacimiento: date,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha_contratacion" className="text-right">
              Fecha de contratación
            </Label>
            <div className="col-span-3">
              <DatePicker
                date={fecha_contratacion}
                setDate={(date) =>
                  setFormState((prev) => ({
                    ...prev,
                    fecha_contratacion: date,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_departamento" className="text-right">
              Departamento
            </Label>
            <Input
              name="id_departamento"
              value={departmentName}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
