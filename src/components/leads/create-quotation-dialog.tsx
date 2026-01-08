import { useState } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CreateQuotationDialogProps {
  trigger: React.ReactNode;
  leadData?: {
    name: string;
    id: string;
  };
}

export default function CreateQuotationDialog({
  trigger,
  leadData,
}: CreateQuotationDialogProps) {
  const [open, setOpen] = useState(false);
  const [sendMethod, setSendMethod] = useState<
    "email" | "whatsapp" | "website"
  >("email");

  const includedMaterials = [
    "Primary Frame Structure",
    "Secondary Framing",
    "Roof Panels",
    "Wall Panels",
    "Trim & Flashing",
    "Fasteners & Hardware",
    "Engineering Drawings",
    "Structural Calculations",
    "Foundation Anchor Bolts",
    "Gutter System",
    "Ridge Ventilation",
    "Insulation (if selected)",
  ];

  const optionalAddons = [
    { name: "Walk-in Doors", price: "+$450 each" },
    { name: "Overhead Doors", price: "+$1,200 each" },
    { name: "Windows", price: "+$180 each" },
    { name: "Skylights", price: "+$320 each" },
    { name: "Insulation Package", price: "+$450" },
    { name: "Color Upgrade", price: "+$450" },
    { name: "Concrete Foundation", price: "+$4500" },
    { name: "Electrical Package", price: "+$450" },
    { name: "HVAC Preparation", price: "+$450" },
    { name: "Loading Dock", price: "+$450" },
    { name: "Office Space", price: "+$450" },
    { name: "Mezzanine Level", price: "+$8,900" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Create Manual Quotation-{leadData?.name || "John Doe"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          {/* Customer Information, Building Requirements, and Pricing in 3 columns */}
          <div className="grid grid-cols-3 gap-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Customer Information</h3>

              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-xs">
                  Customer Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerName"
                  defaultValue="James Lee"
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@doe.com"
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs">
                  Phone
                </Label>
                <Input
                  id="phone"
                  defaultValue="James Lee"
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  defaultValue="Dallas, TX"
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs">
                  Company
                </Label>
                <Input
                  id="company"
                  placeholder="Company name (optional)"
                  className="h-9 text-sm"
                />
              </div>
            </div>

            {/* Building Requirements */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Building Requirements</h3>

              <div className="space-y-2">
                <Label htmlFor="buildingType" className="text-xs">
                  Building Type <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="workshop">
                  <SelectTrigger id="buildingType" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-xs">
                    Width (ft) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    defaultValue="30"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length" className="text-xs">
                    Length (ft) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="length"
                    type="number"
                    defaultValue="40"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-xs">
                    Height (ft) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    defaultValue="12"
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofStyle" className="text-xs">
                  Roof Style <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="gable">
                  <SelectTrigger id="roofStyle" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gable">Gable Roof</SelectItem>
                    <SelectItem value="gambrel">Gambrel Roof</SelectItem>
                    <SelectItem value="hip">Hip Roof</SelectItem>
                    <SelectItem value="flat">Flat Roof</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="windLoad" className="text-xs">
                    Wind Load (mph)
                  </Label>
                  <Input
                    id="windLoad"
                    type="number"
                    defaultValue="120"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="snowLoad" className="text-xs">
                    Snow Load (psf)
                  </Label>
                  <Input
                    id="snowLoad"
                    type="number"
                    defaultValue="20"
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDelivery" className="text-xs">
                  Estimated Delivery
                </Label>
                <Input
                  id="estimatedDelivery"
                  defaultValue="4-6 weeks"
                  className="h-9 text-sm"
                />
              </div>
            </div>

            {/* Pricing & Materials */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Pricing & Materials</h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="basePrice" className="text-xs">
                    Base Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="basePrice"
                    type="number"
                    defaultValue="24500"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice" className="text-xs">
                    Max Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    defaultValue="28000"
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-xs">
                  Currency
                </Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="validUntil" className="text-xs">
                  Quotation Valid Until
                </Label>
                <Input
                  id="validUntil"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms" className="text-xs">
                  Payment Terms
                </Label>
                <Select defaultValue="50-50">
                  <SelectTrigger id="paymentTerms" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-50">
                      50% Down, 50% on Delivery
                    </SelectItem>
                    <SelectItem value="30-70">
                      30% Down, 70% on Delivery
                    </SelectItem>
                    <SelectItem value="full">Full Payment Upfront</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedSalesperson" className="text-xs">
                  Assigned Salesperson
                </Label>
                <Select defaultValue="ai">
                  <SelectTrigger
                    id="assignedSalesperson"
                    className="h-9 text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI Assistant</SelectItem>
                    <SelectItem value="sarah">Sarah Lee</SelectItem>
                    <SelectItem value="john">John Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Included Materials & Components */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">
              Included Materials & Components
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {includedMaterials.map((material, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 border p-2 rounded-md"
                >
                  <input
                    type="checkbox"
                    id={`material-${index}`}
                    className="rounded border-gray-300 h-4 w-4"
                  />
                  <label
                    htmlFor={`material-${index}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 h-8 px-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Optional Add-ons & Upgrades */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">
              Optional Add-ons & Upgrades
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {optionalAddons.map((addon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-2 pr-2 border p-2 rounded-md"
                >
                  <div className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      id={`addon-${index}`}
                      className="rounded border-gray-300 h-4 w-4"
                    />
                    <label
                      htmlFor={`addon-${index}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {addon.name}
                    </label>
                  </div>
                  <span className="text-xs text-blue-600 whitespace-nowrap">
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 h-8 px-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Special Requirements & Notes */}
          <div className="space-y-2">
            <Label htmlFor="specialNotes" className="text-sm font-semibold">
              Special Requirement & Notes
            </Label>
            <Textarea
              id="specialNotes"
              placeholder="Any special building codes, site conditions, or custom requirements..."
              className="min-h-24 text-sm resize-none"
            />
          </div>

          {/* Internal Notes */}
          <div className="space-y-2">
            <Label htmlFor="internalNotes" className="text-sm font-semibold">
              Internal Notes
            </Label>
            <Textarea
              id="internalNotes"
              placeholder="High- value prospect, interested in additional features"
              className="min-h-24 text-sm resize-none"
            />
          </div>

          {/* Lead Source and Priority Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leadSource" className="text-xs">
                Lead source
              </Label>
              <Select defaultValue="high-value">
                <SelectTrigger id="leadSource" className="w-full text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-value">
                    High- value prospect, interested in additional features
                  </SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priorityLevel" className="text-xs">
                Priority Level
              </Label>
              <Select defaultValue="low">
                <SelectTrigger id="priorityLevel" className="w-full text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t flex items-center justify-between  bg-white">
          <div className="flex gap-2">
            <Button
              size="lg"
              className="w-40 border-0 bg-gray-200"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button size="lg" className="bg-gray-700 hover:bg-gray-800 ">
              Save as Draft
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            <Button size="lg">Preview Quotation</Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  className="bg-purple-500 flex items-center gap-2"
                >
                  {`Generate & Send via ${
                    sendMethod === "email"
                      ? "email"
                      : sendMethod === "whatsapp"
                      ? "WhatsApp"
                      : "Website"
                  }`}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuRadioGroup
                  value={sendMethod}
                  onValueChange={(v) =>
                    setSendMethod(v as "email" | "whatsapp" | "website")
                  }
                >
                  <DropdownMenuRadioItem value="email">
                    Email
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="whatsapp">
                    WhatsApp
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="website">
                    Website
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
