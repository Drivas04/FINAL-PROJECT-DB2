import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const NewsTable = () => {

  const [payrollNews, setPayrollNews] = useState([]);

  const fetchPayrollNews = async () => {
    try {
      const response = await fetch('http://localhost:8080/novedades');
      const data = await response.json();
      setPayrollNews(data);
    } catch (error) {
      console.error('Error fetching payroll news:', error);
    }
  };
  useEffect(() => {

    fetchPayrollNews();
  }, []);

  console.log(payrollNews);

  return (
    <Table className="w-full container mx-auto">
      <TableCaption>A list of your recent payNewss.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tipo de novedad</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Fecha de inicio</TableHead>
          <TableHead>Fecha de finalización</TableHead>
          <TableHead>Valor de afectación</TableHead>
          <TableHead>Código de nómina</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payrollNews.map((payNews) => (
          <TableRow key={payNews.id_novedad}>
            <TableCell className="font-medium text-center">{payNews.tipo_novedad}</TableCell>
            <TableCell className="text-center">{payNews.descripcion}</TableCell>
            <TableCell className="text-center">{payNews.fecha_inicio}</TableCell>
            <TableCell className="text-center">{payNews.fecha_fin}</TableCell>
            <TableCell className="text-center">${payNews.valorAfectacion.toLocaleString()}</TableCell>
            <TableCell className="text-center">{payNews.id_nomina}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
