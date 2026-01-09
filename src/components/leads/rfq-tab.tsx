import { Button } from "@/components/ui/button";

export default function RFQTab() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div>
        <div className="text-sm text-gray-500">
          Lead ID-<span className="font-semibold">LD-2025-001</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold">✅ Quote Summary</h3>

      <div className="mt-6 space-y-5 text-sm text-gray-700">
        <div>
          <h4 className="font-medium text-gray-900">
            Your Custom Steel Building Quote
          </h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Building Type: Workshop</li>
            <li>Dimensions: 30' × 40' × 12'</li>
            <li>Roof Style: Gable Roof</li>
            <li>Location: Dallas, TX (120 mph wind load)</li>
            <li>Estimated Delivery: 4-6 weeks</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900">📦 What's Included</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Pre-engineered steel frame</li>
            <li>Roof & wall panels (26-gauge, 30-year warranty)</li>
            <li>Trim & fasteners</li>
            <li>Detailed installation drawings</li>
            <li>Engineer-stamped plans (where required)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900">🛠 Optional Add-Ons</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Roll-up doors</li>
            <li>Walk-in doors & windows</li>
            <li>Skylights</li>
            <li>Insulation package</li>
            <li>Color customization</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex gap-5 justify-center">
        <Button
          variant="outline"
          className="rounded border-primary text-primary w-40"
        >
          Back
        </Button>
        <Button className="rounded">Downloadable PDF Quote</Button>
      </div>
    </div>
  );
}
