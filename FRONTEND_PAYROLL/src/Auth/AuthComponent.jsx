import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "@/hooks/useForm";
import { authHelper } from "@/helpers/authHelper";
import { useNavigate } from "react-router-dom";

export const AuthComponent = () => {
  const initialForm = {
    username: "",
    password: "",
  };

  const { formState, onInputChange } = useForm(initialForm);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { username, password } = formState;

  const onSubmit = (event) => {
    event.preventDefault();
    if(authHelper(username, password, setUser, setError)){
      navigate('/empleados')
    }
  };

  return (
    <main className="flex flex-col items-center justify-center content-center h-[calc(100vh-101px)] bg-background">
      <Card className="w-[350px] bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Inicio sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-7">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  name="username"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  name="password"
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex justify-center m-4">
              <Button
                className="bg-purple-500 hover:bg-purple-600"
                type="submit"
              >
                Ingresar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
