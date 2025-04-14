import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useState } from "react";
import { NewEmployeeComponent } from "@/components/contractsComponents/newContractComponents/NewEmployeeComponent";
import { NewContractComponent } from "@/components/contractsComponents/newContractComponents/NewContractComponent";

export const NewContractScreen = () => {
  const [activeTab, setActiveTab] = useState("new-employee");
  const [newEmployeeId, setNewEmployeeId] = useState(null);

  const handleEmployeeAdded = (employeeId) => {
    setNewEmployeeId(employeeId);
    setActiveTab("new-contract");
  };

  return (
    <main className="flex h-[calc(100vh-101px)] justify-center items-center">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-employee">Datos del empleado</TabsTrigger>
          <TabsTrigger value="new-contract" disabled={!newEmployeeId}>
            Datos del contrato
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new-employee">
          <NewEmployeeComponent onEmployeeAdded={handleEmployeeAdded} />
        </TabsContent>
        <TabsContent value="new-contract">
          {newEmployeeId && <NewContractComponent employeeId={newEmployeeId} />}
        </TabsContent>
      </Tabs>
    </main>
  );
};
