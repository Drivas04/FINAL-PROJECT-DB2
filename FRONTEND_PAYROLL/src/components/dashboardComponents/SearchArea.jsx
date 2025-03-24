import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";


export const SearchArea = () => {
  return (
     <Card className="row-span-2 border rounded-lg shadow-md flex justify-center p-6">
              <CardContent className="grid grid-cols-2 grid-rows-2 gap-1.5">
                <div>
                  <Label htmlFor="email">Id del empleado</Label>
                </div>
                <div className="row-span-2 content-end">
                  <Button type="submit">Buscar</Button>
                </div>
                <div>
                  <Input type="text" name="id" placeholder="Id del empleado" />
                </div>
              </CardContent>
            </Card>
  )
}
