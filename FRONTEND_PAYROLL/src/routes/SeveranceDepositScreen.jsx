import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/ui/button";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) =>
  (currentYear - i).toString()
);

export const SeveranceDepositScreen = () => {
  const initialForm = {
    id_empleado: "",
    fondo: "",
    año: "",
  };

  const { formState, setFormState, onInputChange } = useForm(initialForm);

  const { id_empleado, fondo, año } = formState;

  return (
    <main>
      <h1 className="text-3xl font-bold text-center mt-5">
        Depósito de Cesantías
      </h1>
      <div className="flex justify-center mt-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1110/1110152.png"
          alt="Logo"
          className="w-24 h-24"
        />
      </div>
      <div className="flex justify-center mt-5">
        <h2 className="text-xl font-semibold">
          Bienvenido a la sección de depósito de cesantías
        </h2>
      </div>
      <div className="flex justify-center mt-5">
        <form>
          <div className="grid w-[300px] items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="id_empleado">Número de identificación</Label>
              <Input
                name="id_empleado"
                placeholder="Ingrese el número de identificación"
                value={id_empleado}
                onChange={onInputChange}
                maxLength={10}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                  ];

                  if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="id_empleado">Valor a depositar</Label>
              <Input
                name="valor_deposito"
                placeholder="Ingrese el valor a depositar"
                value={id_empleado}
                onChange={onInputChange}
                maxLength={10}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                  ];

                  if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fondo">Fondo de cesantias</Label>
              <Select value={fondo} onChange={onInputChange}>
                <SelectTrigger name="fondo">
                  <SelectValue placeholder="Seleccione el fondo de cesantias" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Colpatria">
                    Colpatria
                  </SelectItem>
                  <SelectItem value="Porvenir">
                    Porvenir
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="año">Fondo de cesantias</Label>
              <Select
                onValueChange={año}
                onChange={onInputChange}
                defaultValue={año}
                name="año"
                value={año}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un año" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
                  <Button className="bg-violet-600 hover:bg-violet-800">Confirmar y depositar</Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
