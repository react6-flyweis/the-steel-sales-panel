import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowUpDown,
  Clock3,
  DollarSign,
  FileText,
  Filter,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import ProfileCard from "@/components/profile-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import Pagination from "@/components/Pagination";

function formatCurrency(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatJoinedDate(value?: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type ProjectRow = {
  name: string;
  building: string;
  startDate: string;
  stage: string;
  progress: string;
  status: "Work in Progress" | "Active" | "Completed" | "Canceled";
};

const projectRows: ProjectRow[] = [
  {
    name: "ABC Warehouse",
    building: "2",
    startDate: "22 Feb 2025",
    stage: "Shipment",
    progress: "75%",
    status: "Work in Progress",
  },
  {
    name: "Tech Park Dev",
    building: "1",
    startDate: "07 Feb 2025",
    stage: "Engineering",
    progress: "30%",
    status: "Active",
  },
  {
    name: "Downtown Plaza",
    building: "3",
    startDate: "30 Jan 2025",
    stage: "Completed",
    progress: "100%",
    status: "Completed",
  },
  {
    name: "Riverside Complex",
    building: "1",
    startDate: "17 Jan 2025",
    stage: "Canceled",
    progress: "0%",
    status: "Canceled",
  },
];

const statusStyles: Record<ProjectRow["status"], string> = {
  "Work in Progress": "bg-[#FEF3C7] text-[#D97706]",
  Active: "bg-[#DCFCE7] text-[#16A34A]",
  Completed: "bg-[#DCFCE7] text-[#166534]",
  Canceled: "bg-[#FEE2E2] text-[#C2410C]",
};

export default function CustomerDetailLayout() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ?? "unknown";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return projectRows;
    }

    return projectRows.filter((row) => {
      return [
        row.name,
        row.building,
        row.startDate,
        row.stage,
        row.progress,
        row.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [searchTerm]);

  // const totalPages = Math.max(
  //   1,
  //   Math.ceil(filteredProjects.length / rowsPerPage),
  // );

  // useEffect(() => {
  //   if (currentPage > totalPages) {
  //     setCurrentPage(totalPages);
  //   }
  // }, [currentPage, totalPages]);

  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredProjects.slice(start, start + rowsPerPage);
  }, [filteredProjects, currentPage, rowsPerPage]);

  const isLoading = false;
  const isError = false;

  const customerDetailResponse = {
    data: {
      totalPaid: 125000,
      totalPending: 50000,
      totalInvoices: 5,
      customer: {
        _id: id,
        customerId: "12345",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: {
          countryCode: "+1",
          number: "555-123-4567",
        },
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
      },
      projects: [
        {
          name: "ABC Warehouse",
          buildingType: "Warehouse",
          startDate: "2025-02-22",
          stage: "Shipment",
          progress: "75%",
          status: "Work in Progress",
        },
      ],
    },
  };

  const customerData = customerDetailResponse?.data.customer;

  const customerName =
    `${customerData?.firstName ?? ""} ${customerData?.lastName ?? ""}`.trim() ||
    "-";

  const phoneNumber = customerData?.phone?.number ?? "";
  const phoneCountryCode = customerData?.phone?.countryCode ?? "";
  const phone =
    phoneCountryCode && phoneNumber
      ? `${phoneCountryCode} ${phoneNumber}`
      : phoneNumber || "-";

  const joinedDate = formatJoinedDate(customerData?.createdAt);

  const customer = {
    id: customerData?.customerId ?? customerData?._id ?? id,
    customerName,
    email: customerData?.email ?? "-",
    phone,
    inquiryFor:
      customerDetailResponse?.data.projects?.[0]?.buildingType?.trim() || "-",
    status: customerData?.isActive ? "Active" : "Inactive",
    joined: joinedDate,
    address: "-",
  };

  const profileData = {
    name: customer.customerName,
    status: customer.status as "Active" | "Inactive",
    id: customer.id,
    joined: customer.joined,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
  };

  const statCards = [
    {
      title: "Total Paid",
      value: formatCurrency(customerDetailResponse?.data.totalPaid ?? 0),
      color: "bg-[#1D51A4]",
      icon: <DollarSign className="h-5 w-5 text-[#1D51A4]" />,
    },
    {
      title: "Pending Payment",
      value: formatCurrency(customerDetailResponse?.data.totalPending ?? 0),
      color: "bg-[#FD8D5B]",
      icon: <Clock3 className="h-5 w-5 text-[#FD8D5B]" />,
    },
    {
      title: "Total Invoices",
      value: String(customerDetailResponse?.data.totalInvoices ?? 0),
      color: "bg-[#EAB308]",
      icon: <FileText className="h-5 w-5 text-[#EAB308]" />,
    },
    {
      title: "Revenue Generated",
      value: formatCurrency(customerDetailResponse?.data.totalPaid ?? 0),
      color: "bg-[#A855F7]",
      icon: <DollarSign className="h-5 w-5 text-[#A855F7]" />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            onClick={() => navigate(-1)}
            className="px
            -4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-lg ">Customer Details</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Link to={`/customers/${id}/projects/new`}>
            <Button className="w-full sm:w-auto bg-[#1F86D5] hover:bg-[#1769A7]">
              Create new Project
            </Button>
          </Link>
        </div>
      </div>

      {isError ? (
        <Card className="p-4">
          <CardContent className="px-0 py-0 text-sm text-red-600">
            Failed to load customer details. Please refresh and try again.
          </CardContent>
        </Card>
      ) : null}

      {/* Profile Card */}
      <ProfileCard profile={profileData} isLoading={isLoading} />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ title, value, color, icon }) => (
          <StatCard
            key={title}
            title={title}
            value={value}
            color={color}
            icon={icon}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="bg-white max-w-xs">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search"
          />
        </InputGroup>
        <Button type="button" variant="outline">
          <Filter className="" />
          Filter
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all projects"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </TableHead>
                <TableHead className="font-medium text-slate-500">
                  Project Name
                </TableHead>
                <TableHead className="font-medium text-slate-500">
                  Building
                </TableHead>
                <TableHead className="font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    Start Date
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </span>
                </TableHead>
                <TableHead className="font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    Stage
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </span>
                </TableHead>
                <TableHead className="font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    Progress
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </span>
                </TableHead>
                <TableHead className="font-medium text-slate-500">
                  Status
                </TableHead>
                <TableHead className="font-medium text-slate-500">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProjects.map((project) => (
                <TableRow
                  key={`${project.name}-${project.startDate}`}
                  className="text-[13px] text-slate-700"
                >
                  <TableCell className="px-3 py-4">
                    <input
                      type="checkbox"
                      aria-label={`Select ${project.name}`}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-4 font-medium text-slate-700">
                    {project.name}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-slate-700">
                    {project.building}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-slate-700">
                    {project.startDate}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-slate-700">
                    {project.stage}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-slate-700">
                    {project.progress}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${statusStyles[project.status]}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          project.status === "Work in Progress"
                            ? "bg-[#F59E0B]"
                            : project.status === "Active"
                              ? "bg-[#16A34A]"
                              : project.status === "Completed"
                                ? "bg-[#166534]"
                                : "bg-[#DC2626]"
                        }`}
                      />
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        navigate(`/customers/${id}/project-details`)
                      }
                      aria-label={`View ${project.name}`}
                      className=""
                    >
                      view
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="bg-white rounded">
        <Pagination
          totalItems={filteredProjects.length}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
