import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePagination from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";

export const SeveranceListScreen = () => {

    const {
        search,
        setSearch,
        filteredData: filteredSeverance,
      } = useSearch(employees, "numeroDocumento");
      const { currentPage, maxPage, goToPage, paginatedData } = usePagination(
        filteredEmployees,
        5
      );
  return
    <>

    </>;
};
