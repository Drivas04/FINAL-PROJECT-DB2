import { PayrollsTable } from "@/components/payrollComponents/PayrollsTable";
import React from "react";



export const AllPayrollsScreen = () => {

  return (
    <main className="container mx-auto mt-6 md:mt-10 px-4 md:px-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">Nóminas</h1>
        
        <PayrollsTable/>
    </main>
  );
};
