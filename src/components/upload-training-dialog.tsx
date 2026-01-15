import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UploadCloud } from "lucide-react";

type UploadTrainingDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File | null) => void;
};

export default function UploadTrainingDialog({
  open,
  onClose,
  onUpload,
}: UploadTrainingDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleChoose() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    onUpload(file);
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Training File</DialogTitle>
          <DialogDescription>
            Drop your CSV or Excel file here, or click to browse.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-48 w-full max-w-xl items-center justify-center rounded-lg border-2 border-dashed border-slate-200">
            <div className="flex flex-col items-center text-center">
              <UploadCloud className="size-6 text-gray-600" />
              <p className="text-slate-500">Drop your CSV or Excel file here</p>
              <p className="text-slate-400 text-sm mt-2">or click to browse</p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv, .xlsx, .xls"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                type="button"
                onClick={handleChoose}
                className="mt-4 inline-flex items-center rounded-full bg-blue-600 px-6 py-2 text-white shadow-sm"
              >
                Choose file
              </button>

              {file ? (
                <div className="mt-3 text-sm text-slate-600">{file.name}</div>
              ) : null}
            </div>
          </div>

          <div className="text-left text-sm text-slate-500">
            <div>Supported formats: CSV, Excel (.xlsx, .xls)</div>
            <div className="mt-1">
              Required columns: Company, Contact, Email
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 w-36 h-11 rounded-xl"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            className="w-36 h-11 rounded-xl"
            onClick={handleSubmit}
            disabled={!file}
          >
            Upload
          </Button>
        </DialogFooter>

        <DialogClose asChild>
          <button className="sr-only">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
