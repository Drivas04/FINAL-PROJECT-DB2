import React from "react";
import { SearchArea } from "@/components/dashboardComponents/SearchArea";
import { ActiveEmployeesArea } from "@/components/dashboardComponents/ActiveEmployeesArea";
import { RequestsArea } from "@/components/dashboardComponents/RequestsArea";

export const DashboardScreen = () => {
  

  return (
    <main className="pl-28 pt-10 pr-14 pb-12">
      <div className="grid grid-cols-2 grid-rows-4 gap-4">
       <SearchArea/>
        <ActiveEmployeesArea/>
        <RequestsArea/>
        <div className="col-start-2 row-start-4 border rounded-lg shadow-md">
          Eventos
        </div>
      </div>
    </main>
  );
};
