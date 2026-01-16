import checkCircleImage from "@/assets/images/check-circle.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type SuccessDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  okLabel?: string;
};

export default function SuccessDialog({
  open,
  onClose,
  title = "Success!",
  okLabel = "Ok",
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="w-full max-w-md rounded-2xl p-8 text-center shadow-lg">
        <DialogHeader>
          <DialogTitle className="mx-auto mb-6 max-w-xs text-2xl font-semibold leading-tight text-slate-900">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center">
          <img
            src={checkCircleImage}
            alt="success"
            className="size-44 rounded-full object-cover"
          />
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button onClick={onClose} className="mt-3 w-52">
              {okLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
