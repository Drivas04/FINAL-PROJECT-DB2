import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@/hooks/useForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";

export const SeveranceWithdrawScreen = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center mt-5">
        Retiro de Cesantías
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
          Bienvenido a la sección de retiro de cesantías
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
                maxLength={10}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                  ];
                  if (!allowedKeys.includes(e.key) && !/^\d+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="motivo_retiro">Causal de retiro</Label>
              <Select name="motivo_retiro">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la causal de retiro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terminacion">
                    Terminación de contrato
                  </SelectItem>
                  <SelectItem value="adquisicion">
                    Adquisición de vivienda
                  </SelectItem>
                  <SelectItem value="educacion">Educación</SelectItem>
                  <SelectItem value="maternidad">Maternidad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="id_empleado">Valor a retirar</Label>
              <Input
                type="currency"
                name="valor_retiro"
                placeholder="Ingrese el valor a retirar"
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                  ];
                  if (!allowedKeys.includes(e.key) && !/^\d+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fondo">Fondo de cesantías</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el fondo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Colpatria">
                    Fondo de Cesantías Colpatria
                  </SelectItem>
                  <SelectItem value="Porvenir">
                    Fondo de Cesantías Porvenir
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <FileUpload
                label="Selecciona tu documento"
                onChange={(e) => console.log(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button className="bg-violet-600 hover:bg-violet-800">
                Confirmar y retirar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
