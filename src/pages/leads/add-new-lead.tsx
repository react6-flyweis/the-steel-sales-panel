import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import SuccessDialog from "@/components/success-dialog";
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

export default function AddNewLead() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    leadSource: "",
    leadStatus: "New",
    estimatedValue: "",
    priority: "Medium",
    notes: "",
    width: 0,
    length: 0,
    height: 0,
    roofStyle: "",
    buildingType: "",
    doors: 0,
    windows: 0,
    insulation: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (field: string, delta: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(
        0,
        (prev[field as keyof typeof prev] as number) + delta
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save the lead
    console.log("Form submitted:", formData);
    // Show success dialog
    setShowSuccess(true);
  };

  const handleCancel = () => {
    navigate("/leads");
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/leads");
  };

  return (
    <div className="p-6 w-full min-h-0">
      {/* Header */}
      <div className="mb-6">
        <Button onClick={handleCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Add New Lead</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new lead record and assign it to your pipeline
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-5 rounded-lg shadow bg-white"
      >
        {/* Personal Information */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">
                Job title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Lead Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leadSource">
                Lead Source <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.leadSource}
                onValueChange={(value) =>
                  handleSelectChange("leadSource", value)
                }
                required
              >
                <SelectTrigger id="leadSource">
                  <SelectValue placeholder="Select lead source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="cold-call">Cold Call</SelectItem>
                  <SelectItem value="email-campaign">Email Campaign</SelectItem>
                  <SelectItem value="trade-show">Trade Show</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadStatus">Lead Status</Label>
              <Select
                value={formData.leadStatus}
                onValueChange={(value) =>
                  handleSelectChange("leadStatus", value)
                }
              >
                <SelectTrigger id="leadStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Estimated Value</Label>
              <Input
                id="estimatedValue"
                name="estimatedValue"
                type="text"
                placeholder="Enter Estimated Value"
                value={formData.estimatedValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Add any additional notes about this lead"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Project Specification */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Project Specification</h2>
          <div className="space-y-4">
            {/* Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (ft/m)</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("width", -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="width"
                    name="width"
                    type="number"
                    value={formData.width}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        width: Math.max(0, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("width", 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length (ft/m)</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("length", -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="length"
                    name="length"
                    type="number"
                    value={formData.length}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        length: Math.max(0, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("length", 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (ft/m)</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("height", -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        height: Math.max(0, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("height", 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Roof Style and Building Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roofStyle">Roof Style</Label>
                <Select
                  value={formData.roofStyle}
                  onValueChange={(value) =>
                    handleSelectChange("roofStyle", value)
                  }
                >
                  <SelectTrigger id="roofStyle">
                    <SelectValue placeholder="Select Roof Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gable">Gable</SelectItem>
                    <SelectItem value="hip">Hip</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="mansard">Mansard</SelectItem>
                    <SelectItem value="gambrel">Gambrel</SelectItem>
                    <SelectItem value="shed">Shed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buildingType">Building Type</Label>
                <Select
                  value={formData.buildingType}
                  onValueChange={(value) =>
                    handleSelectChange("buildingType", value)
                  }
                >
                  <SelectTrigger id="buildingType">
                    <SelectValue placeholder="Select Building Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doors">Doors</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("doors", -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="doors"
                    name="doors"
                    type="number"
                    value={formData.doors}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        doors: Math.max(0, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("doors", 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="windows">Windows</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("windows", -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="windows"
                    name="windows"
                    type="number"
                    value={formData.windows}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        windows: Math.max(0, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("windows", 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insulation">Insulation</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("insulation", -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="insulation"
                    name="insulation"
                    type="number"
                    value={formData.insulation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        insulation: Math.max(0, parseInt(e.target.value) || 0),
                      }))
                    }
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleNumberChange("insulation", 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Save Lead
          </Button>
        </div>
      </form>
      <SuccessDialog
        open={showSuccess}
        onClose={handleSuccessClose}
        title="Lead Added Successfully!"
      />
    </div>
  );
}
