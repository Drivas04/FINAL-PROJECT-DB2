import { EmployeesTable } from "@/components/employeesComponents/EmployeesTable";
import React from "react";
import { employees } from "@/data/employees";

export const EmployeesScreen = () => {

  const data = employees;
  return (
    <main>
      <div className="container mx-auto py-10">
        <EmployeesTable/>
      </div>
    </main>
  );
};
