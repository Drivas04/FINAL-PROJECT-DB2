import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useDataContext } from "@/context/DataContext";
import usePagination from "@/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import { Input } from "../ui/input";

export const PayrollsTable = () => {
  const { payrolls, deletePayroll } = useDataContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const dropdownRef = useRef(null);
  const {
    search,
    setSearch,
    filteredData: filteredPayrolls,
  } = useSearch(payrolls, "id_contrato");
  const {
    currentPage,
    maxPage,
    goToPage,
    paginatedData,
  } = usePagination(filteredPayrolls, 5);

  return (
    <>
    <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Buscar por ID de contrato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        
      </div>
      <Table>
        <TableCaption>Todas las nóminas generadas hasta la fecha.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id de nómina</TableHead>
            <TableHead>Empleado</TableHead>
            <TableHead>Periodo</TableHead>
            <TableHead className="text-right">Total pagado</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((pay) => (
            <TableRow key={pay.id_nomina}>
              <TableCell className="font-medium">{pay.id_nomina}</TableCell>
              <TableCell className="font-medium">{pay.id_contrato}</TableCell>
              <TableCell>{pay.periodo}</TableCell>
              <TableCell className="text-right font-bold">
                ${pay.total_pagado}
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button ref={dropdownRef} variant="ghost">
                      <HiEllipsisHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          // Aquí puedes abrir un modal o navegar para editar
                          console.log("Editar nómina:", pay);
                        }}
                      >
                        Editar nómina
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="!text-red-600 hover:!text-white hover:!bg-red-600"
                        onClick={() => {
                          if (dropdownRef.current) {
                            dropdownRef.current.click();
                          }
                          setTimeout(() => {
                            setSelectedPayroll(pay);
                            setIsDialogOpen(true);
                          }, 50);
                        }}
                      >
                        Eliminar nómina
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Button variant="ghost" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft />
        </Button>
        <span>{`Página ${currentPage} de ${maxPage}`}</span>
        <Button variant="ghost" onClick={() => goToPage(currentPage + 1)} hidden={currentPage === maxPage}>
          <ChevronRight />
        </Button>
      </div>

      {/* AlertDialog FUERA del DropdownMenu para evitar que se desmonte */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará la nómina de forma
              permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedPayroll) {
                  deletePayroll(selectedPayroll.id_nomina);
                  setSelectedPayroll(null);
                }
                setIsDialogOpen(false);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
