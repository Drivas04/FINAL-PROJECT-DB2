import { PayrollsTable } from "@/components/payrollComponents/PayrollsTable";
import { useDataContext } from "@/context/DataContext";
import { de } from "date-fns/locale";
import React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import useSearch from "@/hooks/useSearch";
import { payroll } from "@/data/payroll";


export const AllPayrollsScreen = () => {

  return (
    <main className="container mx-auto mt-6 md:mt-10 px-4 md:px-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">Nóminas</h1>
        
        <PayrollsTable/>
    </main>
  );
};
