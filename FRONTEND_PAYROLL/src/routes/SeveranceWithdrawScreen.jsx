import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDataContext } from "@/context/DataContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useCesantiasContext } from "@/context/CesantiasContext";
// Importar useNavigate para redireccionar después del éxito
import { useNavigate } from "react-router-dom";

export const SeveranceWithdrawScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addCesantia } = useCesantiasContext();
  const { employeeContext, contractContext } = useDataContext();
  const { employees } = employeeContext;
  const { contracts } = contractContext;

  // Estado para el formulario
  const [contratoId, setContratoId] = useState("");
  const [motivoRetiro, setMotivoRetiro] = useState("");
  const [fondo, setFondo] = useState("");

  // Estado para controlar la UI
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [saldoCesantias, setSaldoCesantias] = useState(null);
  const [interesesCesantias, setInteresesCesantias] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [exitoso, setExitoso] = useState(false);

  // Estado para almacenar los contratos filtrados
  const [contratosActivos, setContratosActivos] = useState([]);

  // Filtrar contratos activos cuando cambian los contratos
  useEffect(() => {
    console.log("Contracts from context:", contracts);

    // Asegurar que contracts sea un array antes de filtrar
    if (Array.isArray(contracts)) {
      // Filtrar los contratos activos (asegurarse de usar la comparación correcta)
      const activos = contracts.filter((c) => {
        console.log(`Contrato ID: ${c.idContrato}, Estado: ${c.estado}`);
        return c.estado === "A";
      });

      console.log("Contratos activos filtrados:", activos);
      setContratosActivos(activos);
    } else {
      console.warn("Contracts no es un array:", contracts);
      setContratosActivos([]);
    }
  }, [contracts]);

  // Manejar cambio de contrato seleccionado
  const handleContratoChange = async (contratoId) => {
    setContratoId(contratoId);
    setLoading(true);

    try {
      console.log(`Contrato seleccionado: ${contratoId}`);

      // Obtener el contrato y el empleado asociado
      const contrato = contracts.find((c) => c.idContrato == contratoId);
      console.log("Contrato encontrado:", contrato);

      if (!contrato) {
        throw new Error("No se encontró el contrato seleccionado");
      }

      const empleado = employees.find(
        (e) => e.idEmpleado === contrato.empleadoIdEmpleado
      );
      console.log("Empleado encontrado:", empleado);

      if (!empleado) {
        throw new Error("No se encontró el empleado asociado al contrato");
      }

      setEmpleadoSeleccionado(empleado);

      // Consultar saldo disponible de cesantías
      const response = await axios.get(
        `http://localhost:8080/cesantias/disponible/${contratoId}`
      );
      console.log("Respuesta API cesantías:", response.data);

      setSaldoCesantias(response.data.valor_cesantias || 0);
      setInteresesCesantias(response.data.intereses_cesantias || 0);

      toast({
        title: "Información cargada",
        description: "Se ha cargado la información de cesantías disponibles",
      });
    } catch (error) {
      console.error("Error al consultar cesantías:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "No se pudo obtener la información de cesantías",
      });
      setSaldoCesantias(null);
      setInteresesCesantias(null);
    } finally {
      setLoading(false);
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!contratoId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debe seleccionar un contrato",
      });
      return;
    }

    if (!motivoRetiro) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debe seleccionar un motivo de retiro",
      });
      return;
    }

    if (!fondo) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debe seleccionar un fondo de cesantías",
      });
      return;
    }

    setEnviando(true);

    try {
      // Preparar datos para el envío con el formato correcto
      const fechaHoy = new Date();
      const fechaFormateada = `${fechaHoy.getFullYear()}-${String(
        fechaHoy.getMonth() + 1
      ).padStart(2, "0")}-${String(fechaHoy.getDate()).padStart(2, "0")}`;
      // Convertir contratoId a Short (asegurando que sea un número)
      const contratoIdInt = Number(contratoId);

      // Asegurar que el período sea string
      const periodoActual = new Date().getFullYear().toString();

      // Enviar el objeto correctamente formateado
      const datos = {
        periodo: periodoActual,
        fechaPago: fechaFormateada,
        motivoRetiro: motivoRetiro,
        fondoCesantias: fondo,
        idContrato: contratoIdInt,
        // Usar directamente saldoCesantias en lugar de valorRetiro
        valorCesantias: parseFloat(saldoCesantias),
        interesesCesantias: parseFloat(interesesCesantias),
      };

      console.log("Enviando datos al backend:", datos);

      // Hacer la llamada directamente
      const response = await addCesantia(datos);
      console.log("Respuesta del backend:", response.data);

      setExitoso(true);
      toast({
        title: "Retiro registrado",
        description: "La solicitud de retiro ha sido registrada correctamente",
      });
    } catch (error) {
      console.error("Error al registrar retiro:", error);

      // Mostrar información más detallada sobre el error para facilitar la depuración
      let errorMessage = "No se pudo procesar la solicitud de retiro";
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Error en el servidor",
        description: errorMessage,
      });
    } finally {
      setEnviando(false);
    }
  };

  //console.log("Enviando datos:", datos);

  // Reiniciar formulario
  const handleReset = () => {
    setContratoId("");
    setMotivoRetiro("");
    setFondo("");
    setEmpleadoSeleccionado(null);
    setSaldoCesantias(null);
    setInteresesCesantias(null);
    setExitoso(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
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

      {exitoso ? (
        <Card className="max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-green-600">
              ¡Retiro Registrado!
            </CardTitle>
            <CardDescription>
              La solicitud de retiro de cesantías ha sido registrada
              exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Detalles del retiro:</p>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Empleado:</strong> {empleadoSeleccionado?.nombre}
              </li>
              <li>
                <strong>Valor:</strong> $
                {(
                  parseFloat(saldoCesantias) + parseFloat(interesesCesantias)
                ).toLocaleString("es-CO")}
              </li>
               <li>
                <strong>Cesantías:</strong> $
                {parseFloat(saldoCesantias).toLocaleString("es-CO")}
              </li>
              <li>
                <strong>Intereses:</strong> $
                {parseFloat(interesesCesantias).toLocaleString("es-CO")}
              </li>
              <li>
                <strong>Fondo:</strong> {fondo}
              </li>
              <li>
                <strong>Motivo:</strong> {motivoRetiro}
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleReset} className="w-full">
              Realizar otro retiro
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle>Solicitud de Retiro</CardTitle>
            <CardDescription>
              Complete el formulario para solicitar un retiro de cesantías
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="contrato">Seleccione el contrato</Label>
                <Select value={contratoId} onValueChange={handleContratoChange}>
                  <SelectTrigger id="contrato">
                    <SelectValue placeholder="Seleccionar contrato" />
                  </SelectTrigger>
                  <SelectContent>
                    {contratosActivos.length > 0 ? (
                      contratosActivos.map((contrato) => {
                        const empleado = employees.find(
                          (e) => e.idEmpleado === contrato.empleadoIdEmpleado
                        );
                        return (
                          <SelectItem
                            key={contrato.idContrato}
                            value={contrato.idContrato}
                          >
                            {empleado
                              ? `${empleado.nombre} - Contrato #${contrato.idContrato}`
                              : `Contrato #${contrato.idContrato}`}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <SelectItem value="no-contratos" disabled>
                        No hay contratos activos disponibles
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {contracts &&
                  contracts.length > 0 &&
                  contratosActivos.length === 0 && (
                    <p className="text-sm text-amber-600 mt-1">
                      No hay contratos con estado "ACTIVO"
                    </p>
                  )}
              </div>

              {loading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {empleadoSeleccionado && saldoCesantias !== null && (
                <>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p>
                      <strong>Empleado:</strong> {empleadoSeleccionado.nombre}
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span>Cesantías disponibles:</span>
                        <span className="font-medium">
                          ${parseFloat(saldoCesantias).toLocaleString("es-CO")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Intereses de cesantías:</span>
                        <span className="font-medium">
                          $
                          {parseFloat(interesesCesantias).toLocaleString(
                            "es-CO"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-1 mt-1">
                        <span className="font-bold">Total disponible:</span>
                        <span className="font-bold">
                          $
                          {(
                            parseFloat(saldoCesantias) +
                            parseFloat(interesesCesantias)
                          ).toLocaleString("es-CO")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="motivo_retiro">Causal de retiro</Label>
                    <Select
                      value={motivoRetiro}
                      onValueChange={setMotivoRetiro}
                    >
                      <SelectTrigger id="motivo_retiro">
                        <SelectValue placeholder="Seleccione la causal de retiro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Terminacion de contrato">
                          Terminación de contrato
                        </SelectItem>
                        <SelectItem value="Vivienda">
                          Adquisición de vivienda
                        </SelectItem>
                        <SelectItem value="Educacion superior">
                          Educación
                        </SelectItem>
                        <SelectItem value="Servicio Militar">
                          Servicio militar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="valor_retiro">Valor a retirar</Label>
                    <div className="relative">
                      <Input
                        id="valor_retiro"
                        type="text"
                        value={
                          saldoCesantias
                            ? (
                                parseFloat(saldoCesantias) +
                                parseFloat(interesesCesantias)
                              ).toLocaleString("es-CO")
                            : "0"
                        }
                        placeholder="Valor a retirar"
                        className="bg-gray-100"
                        readOnly
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500"></span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      El valor del retiro corresponde al saldo total disponible
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="fondo">Fondo de cesantías</Label>
                    <Select value={fondo} onValueChange={setFondo}>
                      <SelectTrigger id="fondo">
                        <SelectValue placeholder="Seleccione el fondo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Colpatria">
                          Fondo de Cesantías Colpatria
                        </SelectItem>
                        <SelectItem value="Porvenir">
                          Fondo de Cesantías Porvenir
                        </SelectItem>
                        <SelectItem value="Proteccion">
                          Protección S.A.
                        </SelectItem>
                        <SelectItem value="Colfondos">Colfondos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-800"
                    disabled={
                      enviando ||
                      !motivoRetiro ||
                      !saldoCesantias ||
                      !fondo ||
                      parseFloat(saldoCesantias) <= 0
                    }
                  >
                    {enviando ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Confirmar y retirar"
                    )}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      )}
    </main>
  );
};
