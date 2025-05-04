"use client";

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
import { employees, getEmployee } from "@/data/employees";
import { useToast } from "@/hooks/use-toast";
import { getEmployeeByPayroll, getPayrrolPayrrollById } from "@/helpers/payrollHelper";
import { contract } from "@/data/contract";
import { useContractContext } from "@/context/ContractContext";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { Link } from "react-router-dom";

export const RequestsArea = () => {
  const [payrollNews, setPayrollNews] = useState([]);
  const {contracts} = useContractContext();
  const { employees} = useEmployeeContext();

  const fetchPayrollNews = async () => {
    try {
      const response = await fetch("http://localhost:8080/novedades");
      const data = await response.json();
      setPayrollNews(data);
    } catch (error) {
      console.error("Error fetching payroll news:", error);
    }
  };
  useEffect(() => {
    fetchPayrollNews();
  }, []);

  const [reqs, setReqs] = useState(requests);

  const { toast } = useToast();


  return (
    <Card>
      <div className="p-4">
        <CardTitle>
          <Link to="/novedades">
          <h1 className="text-violet-600 text-4xl font-semibold">
            Novedades de nomina recientes
          </h1>
          </Link>
        </CardTitle>
        <br />
        <hr />
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="p-4">
              {payrollNews.map((pay) => {
                let employee = getEmployeeByPayroll(contracts, employees, getPayrrolPayrrollById(payrollNews, pay.nominaIdNomina));
                return (
                  <div key={pay.id_novedad}>
                    <div className="flex justify-between content-center">
                      <div className="font-semibold">{pay.tipo_novedad}</div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Ver</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-lg">
                          <DialogHeader>
                            <DialogTitle>Novedad de nomina</DialogTitle>
                            <DialogDescription>
                              Hay una novedad reciente: {employee.nombre}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-row ml-14 justify-items-start gap-4">
                              <Label htmlFor="name" className="">
                                Documento:
                              </Label>
                              <Label>{employee.numeroDocumento}</Label>
                            </div>
                            <div className="flex flex-row ml-14 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Novedad:
                              </Label>
                              <Label>{pay.tipo_novedad}</Label>
                            </div>
                            <div className="flex flex-row ml-14 items-start content-start gap-4">
                              <Label htmlFor="username" className="text-right">
                                Motivo:
                              </Label>
                              <Label className='w-full'>{pay.descripcion}</Label>
                            </div>
                            <div className="flex flex-row ml-14 items-start content-start gap-4">
                              <Label htmlFor="username" className="">
                                Código de nómina:
                              </Label>
                              <Label className='w-full'>{pay.id_nomina}</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <div className="flex justify-end">
                              <DialogClose asChild>
                                <Button>
                                  Volver
                                </Button>
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
