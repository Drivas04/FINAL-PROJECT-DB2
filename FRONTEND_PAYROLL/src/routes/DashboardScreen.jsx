import React from "react";
import { SearchArea } from "@/components/dashboardComponents/SearchArea";
import { ActiveEmployeesArea } from "@/components/dashboardComponents/ActiveEmployeesArea";
import { RequestsArea } from "@/components/dashboardComponents/RequestsArea";
import { EventsArea } from "@/components/dashboardComponents/EventsArea";

export const DashboardScreen = () => {
  

  return (
    <main className="pl-28 pt-3 pr-14 pb-4">
      <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[810px]">
       <SearchArea/>
        <ActiveEmployeesArea/>
        <RequestsArea/>
        <EventsArea/>
      </div>
    </main>
  );
};
