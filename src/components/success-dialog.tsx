import checkCircleImage from "@/assets/images/check-circle.png";

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
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h2 className="mx-auto mb-6 max-w-xs text-2xl font-semibold leading-tight text-slate-900">
          {title}
        </h2>

        <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center">
          <img
            src={checkCircleImage}
            alt="success"
            className="h-28 w-28 rounded-full object-contain"
          />
        </div>

        <div className="mt-1">
          <button
            onClick={onClose}
            className="mx-auto mt-3 inline-flex w-52 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-white shadow-md hover:opacity-95"
          >
            {okLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
