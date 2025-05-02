import { EmployeesTable } from "@/components/employeesComponents/EmployeesTable";
import React from "react";

export const EmployeesScreen = () => {

  return (
    <main>
      <div className="w-[1500px] mx-auto py-10">
        <EmployeesTable />
      </div>
    </main>
  );
};
