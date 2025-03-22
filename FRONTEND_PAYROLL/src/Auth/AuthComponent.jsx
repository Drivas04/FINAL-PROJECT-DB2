import React from "react";
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

export const AuthComponent = () => {
  return (
    <main className="grid items-center justify-center min-h-[800px] bg-background">
      <Card className="w-[350px] bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-7">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="user">Usuario</Label>
                <Input id="user" placeholder="Nombre de usuario" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" placeholder="Contraseña" type="password"/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-purple-500 hover:bg-purple-600">Ingresar</Button>
        </CardFooter>
      </Card>
    </main>
  );
};
