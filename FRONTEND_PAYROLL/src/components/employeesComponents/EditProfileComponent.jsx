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
import { useDepartmentContext } from "@/context/DepartmentsContext";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { department } from "@/data/department";
import { useToast } from "@/hooks/use-toast";
import { DialogSafeDatePicker } from "../ui/DialogSafeDatePicker";

export const EditProfileComponent = ({
  open,
  setOpen,
  employee,
  departmentName,
  onUpdateEmployee,
}) => {
  console.log(employee.idEmpleado);
  const { updateEmployee } = useEmployeeContext();
  const { departments } = useDepartmentContext();
  const { toast } = useToast();

  const initialForm = {
    numeroDocumento: employee.numeroDocumento || "",
    tipoDocumento: employee.tipoDocumento || "",
    nombre: employee.nombre || "",
    apellido: employee.apellido || "",
    telefono: employee.telefono || "",
    correo: employee.correo || "",
    fechaNacimiento: employee.fechaNacimiento
      ? new Date(employee.fechaNacimiento)
      : null,
    fechaContratacion: employee.fechaContratacion
      ? new Date(employee.fechaContratacion)
      : null,
    direccion: employee.direccion || "",
    epsEmpleado: employee.epsEmpleado || "",
    departamentoIdDepartamento: employee.departamentoIdDepartamento || "",
    cuentabancariaNumeroCuenta: employee.cuentabancariaNumeroCuenta || "",
  };

  const { formState, setFormState, onInputChange } = useForm(initialForm);

  const {
    numeroDocumento,
    tipoDocumento,
    nombre,
    apellido,
    telefono,
    correo,
    fechaNacimiento,
    fechaContratacion,
    direccion,
    epsEmpleado,
    departamentoIdDepartamento,
    cuentabancariaNumeroCuenta,
  } = formState;

  useEffect(() => {
    if (employee) {
      const parseCorrectDate = (dateString) => {
        if (!dateString) return null;
        
        // Asegurarse de quitar la parte de hora y crear la fecha como UTC
        const [year, month, day] = dateString.split('T')[0].split('-');
        const date = new Date(Date.UTC(
          parseInt(year, 10),
          parseInt(month, 10) - 1, // Meses en JS son 0-indexed
          parseInt(day, 10),
          12, // Mediodía UTC para evitar problemas de zona horaria
          0,
          0
        ));
        return date;
      };
      setFormState({
        numeroDocumento: employee.numeroDocumento || "",
        tipoDocumento: employee.tipoDocumento || "",
        nombre: employee.nombre || "",
        apellido: employee.apellido || "",
        telefono: employee.telefono || "",
        correo: employee.correo || "",
        fechaNacimiento: employee.fechaNacimiento
          ? new Date(employee.fechaNacimiento)
          : null,
        fechaContratacion: employee.fechaContratacion
          ? new Date(employee.fechaContratacion)
          : null,
        departamentoIdDepartamento: employee.departamentoIdDepartamento || "",
        cuentabancariaNumeroCuenta: employee.cuentabancariaNumeroCuenta || "",
        epsEmpleado: employee.epsEmpleado || "",
        direccion: employee.direccion || "",
      });
    }
  }, [employee, setFormState]);

  const handleSaveChanges = async () => {
    try {
      const formatDate = (date) => {
        if (!date) return null;
        
        if (date instanceof Date) {
          // Ajuste: Agregar 12 horas para asegurar que no cambie el día
          const adjustedDate = new Date(date);
          adjustedDate.setHours(12, 0, 0, 0);
          
          // Formatear como YYYY-MM-DD para la API
          const year = adjustedDate.getFullYear();
          const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
          const day = String(adjustedDate.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
        
        if (typeof date === "string") {
          // Si ya es string, asegurarse que solo tiene la fecha
          return date.split("T")[0];
        }
        
        return null;
      };

      const updatedData = {
        numeroDocumento: formState.numeroDocumento,
        tipoDocumento: formState.tipoDocumento,
        nombre: formState.nombre,
        apellido: formState.apellido,
        telefono: formState.telefono,
        correo: formState.correo,
        fechaNacimiento: formatDate(formState.fechaNacimiento),
        fechaContratacion: formatDate(formState.fechaContratacion),
        epsEmpleado: formState.epsEmpleado,
        direccion: formState.direccion,
        departamentoIdDepartamento: formState.departamentoIdDepartamento,
        cuentabancariaNumeroCuenta: formState.cuentabancariaNumeroCuenta,
      };

      console.log(
        "Enviando datos actualizados:",
        employee.idEmpleado,
        updatedData
      );

      // Llamamos a updateEmployee con el ID y los datos actualizados
      await updateEmployee(employee.idEmpleado, updatedData);

      // Cerramos el modal después de guardar
      setOpen(false);
      toast({
        title: "Empleado actualizado",
        description: "Los datos del empleado se han actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  console.log(employee.idEmpleado);

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
            <Label htmlFor="numeroDocumento" className="text-right">
              Cedula
            </Label>
            <Input
              disabled
              name="numeroDocumento"
              value={numeroDocumento}
              onChange={onInputChange}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipoDocumento" className="text-right">
              Tipo de documento
            </Label>
            <Select
              defaultValue={tipoDocumento}
              onValueChange={(value) =>
                setFormState({ ...formState, tipoDocumento: value })
              }
              name="tipoDocumento"
              value={tipoDocumento}
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
            <Label htmlFor="apellido" className="text-right">
              Apellidos
            </Label>
            <Input
              name="apellido"
              value={apellido}
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
            <Label htmlFor="fechaNacimiento" className="text-right">
              Fecha de nacimiento
            </Label>
            <div className="col-span-3">
              <Input
                type="date"
                name="fechaNacimiento"
                value={
                  fechaNacimiento instanceof Date
                    ? fechaNacimiento.toISOString().split("T")[0]
                    : typeof fechaNacimiento === "string"
                    ? fechaNacimiento.split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  const newDate = e.target.value
                    ? new Date(e.target.value)
                    : null;
                  setFormState((prev) => ({
                    ...prev,
                    fechaNacimiento: newDate,
                  }));
                }}
                className="col-span-3"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fechaContratacion" className="text-right">
              Fecha de contratación
            </Label>
            <div className="col-span-3" onClick={(e) => e.stopPropagation()}>
              <DatePicker
                date={fechaContratacion}
                setDate={(date) =>
                  setFormState((prev) => ({
                    ...prev,
                    fechaContratacion: date,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cuentabancariaNumeroCuenta" className="text-right">
              Numero de cuenta
            </Label>
            <Input
              readOnly
              name="cuentabancariaNumeroCuenta"
              value={cuentabancariaNumeroCuenta}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="direccion" className="text-right">
              Dirección
            </Label>
            <Input
              name="direccion"
              value={direccion}
              onChange={onInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="epsEmpleado" className="text-right">
              EPS
            </Label>
            <Select
              defaultValue={epsEmpleado}
              onValueChange={(value) =>
                setFormState({ ...formState, epsEmpleado: value })
              }
              name="epsEmpleado"
              value={epsEmpleado}
              onChange={onInputChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccione el tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Sura">Sura</SelectItem>
                  <SelectItem value="Compensar">Compensar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="departamentoIdDepartamento" className="text-right">
              Departamento
            </Label>
            <Select
              value={formState.departamentoIdDepartamento}
              onValueChange={(value) => {
                setFormState((prev) => ({
                  ...prev,
                  departamentoIdDepartamento: value,
                }));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={departamentoIdDepartamento} // Convertir a string si es numérico
                >
                  Tecnologia
                </SelectItem>
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
