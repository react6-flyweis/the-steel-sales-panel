import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Calendar28 from "@/components/calendar-input";
import { Button } from "@/components/ui/button";
import SuccessDialog from "@/components/success-dialog";

type Props = {
  trigger?: React.ReactNode;
  defaultDate?: string;
  onNotify?: (date: string) => void;
};

export default function NotifyToAccountsDialog({
  trigger = "Notify",
  defaultDate = "24-10-2025",
  onNotify,
}: Props) {
  const [date, setDate] = React.useState(defaultDate);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const isoDefault = React.useMemo(() => {
    const m = defaultDate.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    return defaultDate;
  }, [defaultDate]);

  const handleNotify = () => {
    onNotify?.(date);
    setShowSuccess(true);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            {trigger}
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Notify To Accounts
            </DialogTitle>
          </DialogHeader>

          <div className="pt-4">
            <Calendar28
              defaultDate={isoDefault}
              onChange={(value) => setDate(value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button onClick={handleNotify}>Notify</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SuccessDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Notification Sent Successfully!"
      />
    </>
  );
}
