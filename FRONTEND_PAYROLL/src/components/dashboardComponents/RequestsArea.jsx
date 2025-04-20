"use client"
 
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { requests } from "@/data/requests";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getEmployee } from "@/data/employees";
import { useToast } from "@/hooks/use-toast";

export const RequestsArea = () => {

  //const reqs = requests;

  const [reqs, setReqs] = useState(requests);

    const {toast} = useToast();

  const acceptRequest = (request_id) => {
    setReqs(reqs.filter((request) => request_id !== request.id));
    toast({
      title: "Solicitud aceptada",
      description: "La solicitud ha sido aceptada y se vera reflejada en la nomina del empleado",
    })
  };

  const declineRequest = (request_id) => {
    setReqs(reqs.filter((request) => request_id !== request.id));
    toast({
      variant: "destructive",
      title: "Solicitud rechazada",
      description: "La solicitud del empleado ha sido rechazada",
    })
  };
  

  return (
    <Card>
      <div className="p-4">
        <CardTitle>
          <h1 className="text-violet-600 text-4xl font-semibold">
            Solicitudes pendientes
          </h1>
        </CardTitle>
        <br />
        <hr />
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="p-4">
              {reqs.map((req) => {
                let employee = getEmployee(req.id_empleado);
                return (
                  <div key={req.id}>
                    <div className="flex justify-between content-center">
                      <div className="text-sm">{req.requestType}</div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Ver</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-lg">
                          <DialogHeader>
                            <DialogTitle>Solicitud</DialogTitle>
                            <DialogDescription>
                              Hay una solicitud pendiente del empleado:
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nombre:
                              </Label>
                              <Label>{employee.nombre}</Label>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Cédula:
                              </Label>
                              <Label>{employee.documento}</Label>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Motivo:
                              </Label>
                              <Label>{req.requestType}</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <div className="flex justify-between">
                              <DialogClose asChild>
                                <Button
                                  onClick={() => declineRequest(req.id)}
                                  variant="destructive"
                                >
                                  Rechazar
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={() => acceptRequest(req.id)}>Aceptar</Button>
                              </DialogClose>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Separator className="my-2" />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </div>
    </Card>
  );
};
