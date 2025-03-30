import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { requests } from "@/data/requests";

export const RequestsArea = () => {
  const reqs = requests;
  return (
    <Card >
      <div className="p-4">
        <CardTitle>
          <h1 className="text-violet-600 text-4xl font-semibold">
            Solicitudes pendientes
          </h1>
        </CardTitle>
        <br />
        <hr />
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="p-4">
              {reqs.map((req) => {
                return (
                  <div key={req.id}>
                    <div className="text-sm">
                      {req.requestType}
                    </div>
                    <Separator className="my-2" />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </div>
    </Card>
  );
};
