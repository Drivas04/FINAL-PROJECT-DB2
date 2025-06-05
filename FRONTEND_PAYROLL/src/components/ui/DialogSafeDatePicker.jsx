// DialogSafeDatePicker.jsx
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DialogSafeDatePicker = ({ date, setDate, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left font-normal ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          onMouseDownCapture={(e) => {
            // Evitar que el evento se propague al dialog
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};