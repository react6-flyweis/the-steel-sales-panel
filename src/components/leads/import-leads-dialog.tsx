import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import uploadIcon from "@/assets/icons/upload.svg";

export default function ImportLeadsDialog() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onChoose = () => inputRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFileName(files[0].name);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          <Upload className="h-4 w-4 mr-2" />
          Import CSV
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg">Import Leads</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="p-4">
          <input
            ref={inputRef}
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 rounded-lg p-5  flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-colors ${
              isDragging
                ? "border-blue-300 bg-blue-50"
                : "border-dashed border-gray-300 bg-transparent"
            }`}
            onClick={onChoose}
            role="button"
          >
            <img src={uploadIcon} alt="Upload Icon" className="size-8" />

            <div className="text-gray-600">
              <p className="text-lg font-medium">
                Drop your CSV or Excel file here
              </p>
              <p className="text-sm text-gray-400 mt-1">or click to browse</p>
            </div>

            <div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onChoose();
                }}
                className="mt-2 bg-blue-600 hover:bg-blue-700"
              >
                Choose file
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-500 mt-4">
            Supported formats: CSV, Excel (.xlsx, .xls)
            <br />
            Required columns: Company, Contact, Email
          </div>

          {fileName && (
            <div className="mt-3 text-sm text-gray-700">
              Selected file: {fileName}
            </div>
          )}
        </div>

        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button size="lg" className="bg-gray-300 text-gray-700 mr-2 w-40">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button size="lg" className="w-40">
              Assign Lead
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
