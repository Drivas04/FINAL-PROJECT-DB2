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
import React, { useEffect } from "react";
import { useContractContext } from "@/context/ContractContext";
import { useToast } from "@/hooks/use-toast";

export const EditContractComponent = ({
  open,
  setOpen,
  contract,
  onUpdateContract,
}) => {
  const { updateContract } = useContractContext();
  const { toast } = useToast();
  
  const initialForm = {
    empleadoIdEmpleado: contract.empleadoIdEmpleado || contract.id_empleado,
    tipoContrato: contract.tipoContrato || contract.tipo_contrato,
    nombreCargo: contract.nombreCargo || contract.cargo,
    fechaInicio: contract.fechaInicio || contract.fecha_inicio,
    fechaFin: contract.fechaFin || contract.fecha_fin,
    salario: contract.salario,
    estado: contract.estado === 'A' ? 'Activo' : 'Inactivo',
  };
  const { formState, setFormState, onInputChange } = useForm(initialForm);

  const {
    salario,
    tipoContrato,
    nombreCargo,
    fechaInicio,
    fechaFin,
    estado,
    empleadoIdEmpleado,
  } = formState;

  useEffect(() => {
    if (contract) {
      setFormState({
        tipoContrato: contract.tipoContrato || "",
        nombreCargo: contract.nombreCargo || "",
        fechaInicio: contract.fechaInicio || "",
        fechaFin: contract.fechaFin || "",
        salario: contract.salario || "",
        estado: contract.estado === 'A' ? 'Activo' : 'Inactivo',
        empleadoIdEmpleado: contract.empleadoIdEmpleado || "",
      });
    }
  }, [contract, setFormState]);

  const handleSaveChanges = async () => {
    try {
      // Validaciones básicas
      if (!formState.nombreCargo || !formState.salario || !formState.tipoContrato) {
        toast({
          variant: "destructive",
          title: "Campos requeridos",
          description: "Por favor complete todos los campos obligatorios."
        });
        return;
      }

      const updatedContractData = {
        ...formState,
        // Asegurarse que el salario es un número
        salario: parseFloat(formState.salario)
      };

      // Llama a la función del contexto para actualizar en el backend
      await updateContract(contract.idContrato, updatedContractData);
      
      // Si hay una función en el componente padre, la llamamos también
      if (onUpdateContract) {
        onUpdateContract({
          ...contract,
          ...updatedContractData
        });
      }

      setOpen(false);
      toast({
        title: "Contrato actualizado",
        description: "Los datos del contrato se han actualizado correctamente."
      });
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: "No se pudieron guardar los cambios. Intente nuevamente."
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar contrato</DialogTitle>
          <DialogDescription>Edita los datos del contrato</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <Label htmlFor="empleadoIdEmpleado">Id del empleado</Label>
          <Input
            disabled
            type="text"
            name="empleadoIdEmpleado"
            value={empleadoIdEmpleado}
            onChange={onInputChange}
          />
          <Label htmlFor="tipoContrato">Tipo de contrato</Label>
          <Select
            name="tipoContrato"
            value={tipoContrato}
            onValueChange={(value) => {
              setFormState({ ...formState, tipoContrato: value });
            }}
            defaultValue={tipoContrato}
            onChange={onInputChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="indefinido">Indefinido</SelectItem>
                <SelectItem value="fijo">Fijo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label htmlFor="nombreCargo">Cargo</Label>
          <Input name="nombreCargo" value={nombreCargo} onChange={onInputChange} required />
          <Label htmlFor="fechaInicio">Fecha de inicio</Label>
          <Input
            type="date"
            name="fechaInicio"
            value={fechaInicio}
            onChange={onInputChange}
          />
          <Label htmlFor="fechaFin">Fecha de finalización</Label>
          <Input
            type="date"
            name="fechaFin"
            value={fechaFin ? fechaFin : ""}
            onChange={onInputChange}
          />
          <Label htmlFor="salario">Salario</Label>
          <Input
            type="number"
            name="salario"
            value={salario}
            onChange={onInputChange}
          />
          <Label htmlFor="estado">Estado</Label>
          <Select
            name="estado"
            value={estado}
            onValueChange={(value) => {
              setFormState({ ...formState, estado: value });
            }}
            defaultValue={estado}
            onChange={onInputChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>

        <DialogFooter>
          <Button onClick={handleSaveChanges}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
