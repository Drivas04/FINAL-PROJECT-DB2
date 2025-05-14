import { EmployeesTable } from "@/components/employeesComponents/EmployeesTable";
import React from "react";

export const EmployeesScreen = () => {

  return (
    <main>
      <div className="container w-full mx-auto px-4 md:px-6 py-6 md:py-10 overflow-x-auto">
        <EmployeesTable />
      </div>
    </main>
  );
};
