import quotationImage from "@/assets/images/quotation.png";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function ProjectQuotationPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="default"
          onClick={() => navigate(-1)}
          className="px-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Project 1 - Quotation
        </h1>
      </div>

      <div className="overflow-x-auto">
        <img src={quotationImage} alt="Quotation" className="w-full h-auto" />
      </div>
    </div>
  );
}
