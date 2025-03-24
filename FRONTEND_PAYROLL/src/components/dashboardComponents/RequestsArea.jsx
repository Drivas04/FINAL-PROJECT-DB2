import React from 'react'
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { requests } from '@/data/requests';

export const RequestsArea = () => {

    const reqs = requests;
  return (
    <Card className="row-span-2 row-start-3 border rounded-lg shadow-md">
              <div className="p-4">
                <CardTitle>
                  <h1 className="text-violet-600 text-4xl font-semibold">
                    Solicitudes pendientes
                  </h1>
                </CardTitle>
                <br />
                <hr />
                <CardContent>
                  <ul className="pt-4 pl-4">
                    {reqs.map((req) => {
                      return (
                        <div key={req.id}>
                          <li>{req.requestType}</li>
                          <hr />
                        </div>
                      );
                    })}
                  </ul>
                </CardContent>
              </div>
            </Card>
  )
}
