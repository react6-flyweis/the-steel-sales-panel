import { useMemo, useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Calendar,
  DollarSign,
  CheckCircle,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";

type Invoice = {
  id: string;
  invoiceNumber: string;
  customer: string;
  dueDate: string; // ISO
  amount: number;
  paid: number;
  status: "Paid" | "Unpaid";
};

const initialInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV001",
    customer: "Carl Evans",
    dueDate: "2024-12-24",
    amount: 500,
    paid: 500,
    status: "Paid",
  },
  {
    id: "2",
    invoiceNumber: "INV002",
    customer: "Minerva Rameriz",
    dueDate: "2024-12-10",
    amount: 1500,
    paid: 1500,
    status: "Paid",
  },
  {
    id: "3",
    invoiceNumber: "INV003",
    customer: "Robert Lamon",
    dueDate: "2024-11-27",
    amount: 600,
    paid: 600,
    status: "Paid",
  },
  {
    id: "4",
    invoiceNumber: "INV004",
    customer: "Patricia Lewis",
    dueDate: "2024-11-18",
    amount: 1000,
    paid: 1000,
    status: "Paid",
  },
  {
    id: "5",
    invoiceNumber: "INV005",
    customer: "Mark Joslyn",
    dueDate: "2024-11-06",
    amount: 1200,
    paid: 1200,
    status: "Paid",
  },
  {
    id: "6",
    invoiceNumber: "INV006",
    customer: "Marsha Betts",
    dueDate: "2024-10-25",
    amount: 800,
    paid: 800,
    status: "Paid",
  },
  {
    id: "7",
    invoiceNumber: "INV007",
    customer: "Daniel Jude",
    dueDate: "2024-10-14",
    amount: 2000,
    paid: 2000,
    status: "Paid",
  },
  {
    id: "8",
    invoiceNumber: "INV008",
    customer: "Emma Bates",
    dueDate: "2024-10-03",
    amount: 100,
    paid: 100,
    status: "Paid",
  },
  {
    id: "9",
    invoiceNumber: "INV009",
    customer: "Richard Fralick",
    dueDate: "2024-09-20",
    amount: 300,
    paid: 300,
    status: "Paid",
  },
  {
    id: "10",
    invoiceNumber: "INV010",
    customer: "Michelle Robison",
    dueDate: "2024-09-10",
    amount: 5000,
    paid: 0,
    status: "Unpaid",
  },
];

function formatCurrency(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function InvoiceListPage() {
  const [invoices] = useState(initialInvoices);
  const [query, setQuery] = useState("");
  const [customerFilter, setCustomerFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (customerFilter !== "All" && inv.customer !== customerFilter)
        return false;
      if (statusFilter !== "All" && inv.status !== statusFilter) return false;
      if (
        query &&
        !`${inv.invoiceNumber} ${inv.customer}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [invoices, customerFilter, statusFilter, query]);

  const totalAmount = filtered.reduce((s, i) => s + i.amount, 0);
  const totalPaid = filtered.reduce((s, i) => s + i.paid, 0);
  const totalUnpaid = filtered.reduce((s, i) => s + (i.amount - i.paid), 0);
  const overdue = filtered.reduce((s, i) => {
    const now = new Date();
    const due = new Date(i.dueDate);
    if (due < now && i.amount - i.paid > 0) return s + (i.amount - i.paid);
    return s;
  }, 0);

  // page slice
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const current = Math.min(currentPage, totalPages);
  const start = (current - 1) * rowsPerPage;
  const paginated = filtered.slice(start, start + rowsPerPage);

  const customers = useMemo(() => {
    const set = new Set<string>();
    invoices.forEach((i) => set.add(i.customer));
    return ["All", ...Array.from(set)];
  }, [invoices]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Invoice Report</h1>
          <p className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Invoice Report
          </p>
        </div>
        {/* action buttons moved into table header for compact layout */}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-md p-4 shadow flex items-center gap-4 border border-green-200">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-500 text-white">
            <DollarSign className="text-white" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Amount</div>
            <div className="text-xl font-semibold">
              {formatCurrency(totalAmount)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 shadow flex items-center gap-4 border border-blue-200">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-600 text-white">
            <CheckCircle className="text-white" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Paid</div>
            <div className="text-xl font-semibold">
              {formatCurrency(totalPaid)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 shadow flex items-center gap-4 border border-orange-200">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500 text-white">
            <CreditCard className="text-white" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Unpaid</div>
            <div className="text-xl font-semibold">
              {formatCurrency(totalUnpaid)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 shadow flex items-center gap-4 border border-red-200">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-600 text-white">
            <AlertCircle className="text-white" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Overdue</div>
            <div className="text-xl font-semibold">
              {formatCurrency(overdue)}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/3">
              <label className="text-xs text-gray-500">Choose Date</label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                <Input
                  readOnly
                  value="01 Jan-2025 - 12-Dec-2025"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <label className="text-xs text-gray-500">Customer</label>
              <select
                className="border rounded px-3 py-2 w-full mt-1"
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
              >
                {customers.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-1/3 flex items-end justify-between">
              <div className="w-2/3">
                <label className="text-xs text-gray-500">Status</label>
                <select
                  className="border rounded px-3 py-2 w-full mt-1"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="ml-4">
                <Button
                  onClick={() => {
                    setQuery("");
                    setCustomerFilter("All");
                    setStatusFilter("All");
                  }}
                  className="bg-orange-500 text-white px-6 py-2"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Invoice List</h3>
            <div className="bg-white rounded-md px-2 py-1 flex items-center gap-2 ">
              <button
                title="Export PDF"
                className="w-9 h-9 rounded bg-white flex items-center justify-center text-red-600 border"
              >
                <FileText className="size-4" />
              </button>
              <button
                title="Export Excel"
                className="w-9 h-9 rounded bg-white flex items-center justify-center text-green-600 border"
              >
                <Download className="size-4" />
              </button>
              <button
                title="Print"
                className="w-9 h-9 rounded bg-white flex items-center justify-center text-gray-600 border"
              >
                <Printer className="size-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto border-t bg-white">
            <Table className="bg-white">
              <TableHeader>
                <tr className="bg-gray-50">
                  <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                    Invoice Number
                  </TableHead>
                  <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                    Customer
                  </TableHead>
                  <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                    Due Date
                  </TableHead>
                  <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                    Amount
                  </TableHead>
                  <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                    Paid
                  </TableHead>
                  <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                    Amount Due
                  </TableHead>
                  <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                    Status
                  </TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {paginated.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="text-orange-500 font-medium px-6 py-4">
                      {inv.invoiceNumber}
                    </TableCell>
                    <TableCell>{inv.customer}</TableCell>
                    <TableCell>
                      {new Date(inv.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{formatCurrency(inv.amount)}</TableCell>
                    <TableCell>{formatCurrency(inv.paid)}</TableCell>
                    <TableCell>
                      {formatCurrency(inv.amount - inv.paid)}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {inv.status === "Paid" ? (
                        <span className="inline-flex items-center gap-2 bg-green-400 text-white px-2 py-0.5 rounded-md text-sm font-medium">
                          <span className="w-2 h-2 bg-white rounded-full" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 bg-red-400 text-white px-2 py-0.5 rounded-md text-sm font-medium">
                          <span className="w-2 h-2 bg-white rounded-full" />
                          Unpaid
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            totalItems={totalItems}
            currentPage={current}
            rowsPerPage={rowsPerPage}
            onPageChange={(p) => setCurrentPage(p)}
            onRowsPerPageChange={(r) => {
              setRowsPerPage(r);
              setCurrentPage(1);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
