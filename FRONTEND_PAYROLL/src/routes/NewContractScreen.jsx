import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { NewEmployeeComponent } from "@/components/contractsComponents/newContractComponents/NewEmployeeComponent";
import { NewContractComponent } from "@/components/contractsComponents/newContractComponents/NewContractComponent";
import { useToast } from "@/hooks/use-toast";
import { useContractContext } from "@/context/ContractContext";
import { useNavigate } from "react-router-dom";

export const NewContractScreen = () => {
  const [activeTab, setActiveTab] = useState("new-employee");
  const [newEmployeeData, setNewEmployeeData] = useState(null);
  const { addContract } = useContractContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmployeeDataSaved = (employeeData) => {
    setNewEmployeeData(employeeData);
    setActiveTab("new-contract");
  };

  const handleContractSubmit = async (contractData) => {
    try {
      // Envía tanto los datos del empleado como del contrato
      await addContract(contractData, newEmployeeData);
      
      toast({
        description: "El contrato y empleado se han creado con éxito",
      });
      
      navigate("/contratos");
    } catch (error) {
      console.error("Error al crear contrato y empleado:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el contrato. Por favor, intenta de nuevo.",
      });
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-101px)] justify-center items-center px-4 md:px-0 py-6 md:py-0">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-employee" className="text-xs md:text-sm py-1 md:py-2">Datos del empleado</TabsTrigger>
          <TabsTrigger value="new-contract" disabled={!newEmployeeData} className="text-xs md:text-sm py-1 md:py-2">
            Datos del contrato
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new-employee">
          <NewEmployeeComponent onEmployeeDataSaved={handleEmployeeDataSaved} />
        </TabsContent>
        <TabsContent value="new-contract">
          {newEmployeeData && (
            <NewContractComponent 
              employeeData={newEmployeeData} 
              onContractSubmit={handleContractSubmit}
            />
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
};
