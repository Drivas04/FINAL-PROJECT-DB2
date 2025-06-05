import { useState } from "react";
import { Label } from "@/components/ui/label";

export const FileUpload = ({ label = "Subir archivo", onChange }) => {
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const names = files.map((file) => file.name);
    setFileNames(names);
    if (onChange) onChange(e);
  };

  return (
    <div className="w-full">
      <Label className="mb-1 block text-sm font-medium">
        {label}
      </Label>
      <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all text-gray-600 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l8-8m0 0l8 8m-8-8v16"
          />
        </svg>
        <span className="text-black">Seleccionar archivo</span>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          multiple={true}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
        />
      </label>
      {fileNames.length > 0 && (
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside space-y-1">
          {fileNames.map((name, index) => (
            <li key={index} className="truncate">
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
