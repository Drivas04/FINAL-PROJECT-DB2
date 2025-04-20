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
    <main className="container mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-10">Nominas</h1>
        
        <PayrollsTable/>
    </main>
  );
};
