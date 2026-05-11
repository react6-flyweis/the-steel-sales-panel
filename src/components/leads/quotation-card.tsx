import quotationImage from "@/assets/images/quotation.png";

export default function QuotationCard() {
  return (
    // image with scroll
    <div className="overflow-x-auto">
      <img src={quotationImage} alt="Quotation" className="w-full h-auto" />
    </div>
  );
}
