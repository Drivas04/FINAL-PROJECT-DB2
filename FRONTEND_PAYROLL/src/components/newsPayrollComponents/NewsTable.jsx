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

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/novedades/${id}`, {
        method: 'DELETE',
      });
      setPayrollNews((prevNews) => prevNews.filter((news) => news.idNovedad !== id));
    } catch (error) {
      console.error('Error deleting payroll news:', error);
    }
  }

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
          <TableHead className="text-center">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payrollNews.map((payNews) => (
          <TableRow key={payNews.idNovedad}>
            <TableCell className="font-medium text-center">{payNews.tipoNovedad}</TableCell>
            <TableCell className="text-center">{payNews.descripcion}</TableCell>
            <TableCell className="text-center">{payNews.fechaInicio}</TableCell>
            <TableCell className="text-center">{payNews.fechaFin}</TableCell>
            <TableCell className="text-center">${payNews.valorAfectacion.toLocaleString() || 0}</TableCell>
            <TableCell className="text-center">{payNews.nominaIdNomina}</TableCell>
            <TableCell className="text-center">
              <button
                onClick={() => handleDelete(payNews.idNovedad)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
