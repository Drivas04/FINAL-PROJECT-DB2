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
import { useForm } from '@/hooks/useForm';
import React, {useEffect} from 'react'

export const EditContractComponent = ({open, setOpen, contract, onUpdateContract}) => {
    const initialForm = {
        id_empleado: contract.id_empleado,
        tipo_contrato: contract.tipo_contrato,
        fecha_inicio: contract.fecha_inicio,
        fecha_fin: contract.fecha_fin,
        salario: contract.salario,
        estado: contract.estado,
    };
    const { formState, setFormState, onInputChange } = useForm(initialForm);

    const {
        id_empleado,
        tipo_contrato,
        fecha_inicio,
        fecha_fin,
        salario,
        estado,
    } = formState;

    useEffect(() => {
        if (contract) {
            setFormState({
                id_empleado: contract.id_empleado || "",
                tipo_contrato: contract.tipo_contrato || "",
                fecha_inicio: contract.fecha_inicio || "",
                fecha_fin: contract.fecha_fin || "",
                salario: contract.salario || "",
                estado: contract.estado || "",
            });
        }
    }, [contract, setFormState]);

    const handleSaveChanges = () => {
        const updatedContract = {
            ...contract,
            id_empleado: formState.id_empleado,
            tipo_contrato: formState.tipo_contrato,
            fecha_inicio: formState.fecha_inicio.toString(),
            fecha_fin: formState.fecha_fin.toString(),
            salario: formState.salario,
            estado: formState.estado,
        };
        
        onUpdateContract(updatedContract);
        setOpen(false);
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Editar contrato</DialogTitle>
            <DialogDescription>
                Edita los datos del contrato
            </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4">
            <Label htmlFor="id_empleado">Id del empleado</Label>
            <Input
                disabled
                type="text"
                name="id_empleado"
                value={id_empleado}
                onChange={onInputChange}
            />
            <Label htmlFor="tipo_contrato">Tipo de contrato</Label>
            <Select
                name="tipo_contrato"
                value={tipo_contrato}
                onValueChange={(value) => {
                    setFormState({ ...formState, tipo_contrato: value});
                }}
                defaultValue={tipo_contrato}
                onChange={onInputChange}
                >
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecciona el estado' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='indefinido'>Indefinido</SelectItem>
                        <SelectItem value='fijo'>Fijo</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
            <Input
                type="date"
                name="fecha_inicio"
                value={fecha_inicio}
                onChange={onInputChange}
            />
            <Label htmlFor="fecha_fin">Fecha de finalización</Label>
            <Input
                type="date"
                name="fecha_fin"
                value={fecha_fin? fecha_fin : ""}
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
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecciona el estado' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='Activo'>Activo</SelectItem>
                        <SelectItem value='Inactivo'>Inactivo</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
    
            </form>
    
            <DialogFooter>
            <Button onClick={handleSaveChanges}>Guardar cambios</Button>
            </DialogFooter>
    
        </DialogContent>
    </Dialog>
  )
}
