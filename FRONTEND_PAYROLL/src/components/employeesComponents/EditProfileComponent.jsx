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
import { department } from "@/data/department";

export const EditProfileComponent = ({
  open,
  setOpen,
  employee,
  departmentName,
  onUpdateEmployee,
}) => {
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

  const handleSaveChanges = () => {
    // Crear un objeto con la estructura esperada por EmployeesTable
    const updatedEmployee = {
      ...employee, // Mantener los campos originales que no cambiaron (como id_empleado)
      documento: formState.cedula,
      tipo_documento: formState.tipo_documento,
      nombre: formState.nombre,
      telefono: formState.telefono,
      correo: formState.correo,
      fecha_nacimiento: formState.fecha_nacimiento,
      fecha_contratacion: formState.fecha_contratacion,
      id_departamento: formState.id_departamento,
    };

    // Llamar a la función de actualización con el empleado modificado
    onUpdateEmployee(updatedEmployee);
    console.log("Datos del empleado actualizados:", updatedEmployee);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil de {employee.nombre}</DialogTitle>
          <DialogDescription>
            Haz los cambios necesarios aqui. Da click en "Guardar" para aplicar
            los cambios.
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
            <Select
              defaultValue={tipo_documento}
              onValueChange={(value) =>
                setFormState({ ...formState, tipo_documento: value })
              }
              name="tipo_documento"
              value={tipo_documento}
              onChange={onInputChange}
            >
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
            <Select
              name="id_departamento"
              defaultValue={departmentName}
              onChange={onInputChange}
              value={departmentName}
              onValueChange={(value) =>
                setFormState((prev) => ({
                  ...prev,
                  id_departamento: value,
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {department.map((dept) => (
                    <SelectItem
                      key={dept.id_departamento}
                      value={dept.id_departamento}
                    >
                      {dept.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
