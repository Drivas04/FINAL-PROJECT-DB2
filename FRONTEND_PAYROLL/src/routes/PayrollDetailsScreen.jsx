import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { employees } from "../data/employees";
import { contract } from "@/data/contract";
import { payroll } from "@/data/payroll";
import { getDepartmentName } from "@/helpers/EmployeeHelper";
import { Button } from "@/components/ui/button";

export const PayrollDetailsScreen = () => {
  const { idNomina } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [contrato, setContrato] = useState(null);
  const [nomina, setNomina] = useState(null);

  useEffect(() => {
    const nominaSeleccionada = payroll.find(
      (n) => n.id_nomina === parseInt(idNomina)
    );
    if (nominaSeleccionada) {
      setNomina(nominaSeleccionada);
      const cont = contract.find(
        (c) => c.id_contrato === nominaSeleccionada.id_contrato
      );
      setContrato(cont);
      const emp = employees.find((e) => e.id_empleado === cont.id_empleado);
      setEmpleado(emp);
    }
  }, [idNomina]);

  const sendPayrollEmail = () => {
    const email = empleado.correo;
    const subject = "Detalles de nómina";
    const body = `Hola ${empleado.nombre},\n\nAquí están los detalles de tu nómina:\n\nSalario base: ${nomina.salario_base}\nHoras extras: ${nomina.horas_extras}\nDeducciones: ${nomina.descuentos}\nTotal a pagar: ${nomina.total_pagado}\n\nSaludos,\nEquipo de Recursos Humanos`;
    console.log('correo enviado a:', email);
  };

  if (!empleado || !contrato || !nomina)
    return <p className="p-4">Cargando detalles...</p>;

  return (
    <main className="container mx-auto mt-5 w-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Empleado: {empleado.nombre}
        </h1>
        <Button onClick={() => sendPayrollEmail()}>Enviar nómina</Button>
      </div>

      <table className="w-full mt-2 mb-8 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Campo</th>
            <th className="border border-gray-300 p-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Cédula</td>
            <td className="border border-gray-300 p-2">{empleado.documento}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cargo</td>
            <td className="border border-gray-300 p-2">{contrato.cargo}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Departamento</td>
            <td className="border border-gray-300 p-2">
              {getDepartmentName(empleado.id_departamento)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Tipo de contrato</td>
            <td className="border border-gray-300 p-2">
              {contrato.tipo_contrato}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Fecha de ingreso</td>
            <td className="border border-gray-300 p-2">
              {new Date(contrato.fecha_inicio).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Entidad bancaria</td>
            <td className="border border-gray-300 p-2">{"Bancolombia"}</td>
          </tr>
          <tr></tr>
          <tr>
            <td className="border border-gray-300 p-2">EPS</td>
            <td className="border border-gray-300 p-2">{String("SURA")}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Fondo de pensiones</td>
            <td className="border border-gray-300 p-2">{"Porvenir"}</td>
          </tr>
        </tbody>
      </table>

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Detalle de la Nómina
      </h1>
      <table className="w-full mt-2 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Concepto</th>
            <th className="border border-gray-300 p-2">Valor</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td className="border border-gray-300 p-2">Periodo</td>
            <td className="border border-gray-300 p-2">
              {nomina.periodo}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Salario base</td>
            <td className="border border-gray-300 p-2">
              ${nomina.salario_base.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Horas extras</td>
            <td className="border border-gray-300 p-2">
              ${nomina.horas_extras.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Deducciones</td>
            <td className="border border-gray-300 p-2">
              ${nomina.descuentos.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Retención %</td>
            <td className="border border-gray-300 p-2">
              ${(200000).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Cuenta bancaria</td>
            <td className="border border-gray-300 p-2">
              ${nomina.descuentos.toLocaleString()}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-gray-200">
            <td className="border border-gray-300 p-2 font-semibold">
              Total a pagar
            </td>
            <td className="border border-gray-300 p-2 font-semibold">
              ${nomina.total_pagado.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
};
