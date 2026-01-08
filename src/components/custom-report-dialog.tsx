"use client";
import * as React from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomReportDialog() {
  const [exportPdf, setExportPdf] = React.useState(false);
  const [exportExcel, setExportExcel] = React.useState(false);
  const [exportCsv, setExportCsv] = React.useState(false);

  const [includeCharts, setIncludeCharts] = React.useState(false);
  const [includeTables, setIncludeTables] = React.useState(false);
  const [emailWhenReady, setEmailWhenReady] = React.useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Generate Custom Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto w-full">
        <DialogHeader className="border-b">
          <DialogTitle className="text-lg font-semibold">
            Generate Custom Report
          </DialogTitle>
          <DialogDescription className="sr-only">
            Choose report settings and export options.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <Label className="mb-2">Report Type *</Label>
            <Select defaultValue="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="lead-conversion">
                  Lead Conversion Report
                </SelectItem>
                <SelectItem value="employee-performance">
                  Employee Performance Report
                </SelectItem>
                <SelectItem value="revenue-analysis">
                  Revenue Analysis
                </SelectItem>
                <SelectItem value="ai-support">AI Support Analytics</SelectItem>
                <SelectItem value="pipeline-analysis">
                  Pipeline Analysis
                </SelectItem>
                <SelectItem value="customer-analytics">
                  Customer Analytics
                </SelectItem>
                <SelectItem value="tax-summary">Tax Summary Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Start Date</Label>
              <Input type="date" placeholder="dd-mm-yyyy" />
            </div>
            <div>
              <Label className="mb-2">End Date</Label>
              <Input type="date" placeholder="dd-mm-yyyy" />
            </div>
          </div>

          <div>
            <Label className="mb-2">Filter By</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All data</SelectItem>
                <SelectItem value="by-team">By Team</SelectItem>
                <SelectItem value="by-employee">By Employee</SelectItem>
                <SelectItem value="by-lead-source">By Lead Source</SelectItem>
                <SelectItem value="by-priority">By Priority</SelectItem>
                <SelectItem value="by-pipeline-stage">
                  By Pipeline Stage
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Report Options</div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportPdf}
                  onChange={(e) => setExportPdf(e.target.checked)}
                />
                <span className="text-sm">PDF</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportExcel}
                  onChange={(e) => setExportExcel(e.target.checked)}
                />
                <span className="text-sm">Excel</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportCsv}
                  onChange={(e) => setExportCsv(e.target.checked)}
                />
                <span className="text-sm">CSV</span>
              </label>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Report Options</div>
            <div className="space-y-3">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                />
                <span className="text-sm">
                  Include charts and visualisations
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={includeTables}
                  onChange={(e) => setIncludeTables(e.target.checked)}
                />
                <span className="text-sm">Include detailed data tables</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={emailWhenReady}
                  onChange={(e) => setEmailWhenReady(e.target.checked)}
                />
                <span className="text-sm">Email report when ready</span>
              </label>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6" showCloseButton={false}>
          <DialogClose asChild>
            <Button
              size="lg"
              className="bg-gray-200 text-gray-800 hover:bg-gray-400 w-32"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" className="px-5">
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
