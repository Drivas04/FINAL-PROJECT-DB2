import React from "react";
import { SearchArea } from "@/components/dashboardComponents/SearchArea";
import { ActiveEmployeesArea } from "@/components/dashboardComponents/ActiveEmployeesArea";
import { RequestsArea } from "@/components/dashboardComponents/RequestsArea";
import { EventsArea } from "@/components/dashboardComponents/EventsArea";

export const DashboardScreen = () => {
  

  return (
    <main className="pl-28 pt-3 pr-14 pb-4 h-[calc(100vh-101px)]">
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
       <SearchArea/>
        <ActiveEmployeesArea/>
        <RequestsArea/>
        <EventsArea/>
      </div>
    </main>
  );
};
