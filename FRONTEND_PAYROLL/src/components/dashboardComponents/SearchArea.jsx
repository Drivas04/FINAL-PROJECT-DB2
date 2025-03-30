import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle , CardHeader, CardDescription} from "@/components/ui/card";

export const SearchArea = () => {
  return (
    <Card className='h-auto'>
      <CardHeader>
        <CardTitle>
        <h1 className="text-violet-600 text-4xl font-semibold">
            Buscar empleado
          </h1>
        </CardTitle>
        <CardDescription>Busca uno de los empleados activos por su identificador unico</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
              <Label htmlFor="name">Identificador del empleado</Label>
            <div className="flex flex-row gap-3">
              <Input id="name" placeholder="Id" />
              <Button>Buscar</Button>
            </div>

          </div>
      </CardContent>
    </Card>
  );
};
