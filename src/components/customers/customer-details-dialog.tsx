import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type PaymentItem = {
  invoice: string;
  date: string | null;
  amount: number;
  balance?: string;
  status?: string;
};

type Customer = {
  id?: string;
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  totalPayment?: number;
  totalPaid?: number;
  outstanding?: number;
  payments?: PaymentItem[];
};

export default function CustomerDetailsDialog({
  trigger,
  customer,
}: {
  trigger?: React.ReactNode;
  customer?: Customer;
}) {
  const [open, setOpen] = React.useState(false);

  const c: Customer = customer ?? {
    name: "John Doe",
    companyName: "ABC Corporation",
    email: "contact@abccorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, New York, NY 10001",
    totalPayment: 15000,
    totalPaid: 0,
    outstanding: 15000,
    payments: [
      {
        invoice: "INV 2024-001",
        date: "27-01-2025",
        amount: 12500,
        balance: "27-01-2025",
        status: "Confirmed",
      },
      {
        invoice: "INV 2024-001",
        date: "27-01-2025",
        amount: 12500,
        balance: "27-01-2025",
        status: "Confirmed",
      },
      {
        invoice: "INV 2024-002",
        date: "02-02-2025",
        amount: 12500,
        balance: "02-02-2025",
        status: "Confirmed",
      },
      {
        invoice: "INV 2024-003",
        date: "05-02-2025",
        amount: 12500,
        balance: "05-02-2025",
        status: "Confirmed",
      },
    ],
  };

  const formatCurrency = (amount?: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount ?? 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className="sm:max-w-3xl max-h-[95vh] p-0 overflow-y-auto">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Customer Details - {c.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Contact and payment summary
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 ">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Contact Information
              </h3>
              <div className="mt-3 text-sm text-gray-700 space-y-3 grid grid-cols-1 lg:grid-cols-2">
                <div className="">
                  <div className="text-xs text-gray-400">Company Name</div>
                  <div className="font-medium">{c.companyName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="font-medium">{c.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Phone</div>
                  <div className="font-medium">{c.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Address</div>
                  <div className="font-medium">{c.address}</div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-blue-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Financial Summary
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-400">Total Payment</div>
                  <div className="font-semibold text-gray-900 mt-1">
                    {formatCurrency(c.totalPayment)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Total Paid</div>
                  <div className="font-semibold text-green-600 mt-1">
                    {formatCurrency(c.totalPaid)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">
                    Outstanding Balance
                  </div>
                  <div className="font-semibold text-red-600 mt-1">
                    {formatCurrency(c.outstanding)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Payment History
            </h3>
            <div className="bg-white rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">
                      Invoice #
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">
                      Balance
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {c.payments?.map((p, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-3">
                        <a
                          href="#"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {p.invoice}
                        </a>
                      </td>
                      <td className="px-4 py-3">{p.date ?? "------"}</td>
                      <td className="px-4 py-3 font-semibold">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="px-4 py-3">{p.balance}</td>
                      <td className="px-4 py-3">
                        {p.status ? <Badge>{p.status}</Badge> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
