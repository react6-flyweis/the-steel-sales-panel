import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

type Client = { id: string; name: string; company: string };

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

// Mock client data
const clients: Client[] = [
  { id: "1", name: "John Smith", company: "Tech Solutions Inc." },
  { id: "2", name: "Sarah Johnson", company: "Digital Marketing Pro" },
  { id: "3", name: "Michael Brown", company: "Creative Design Studio" },
  { id: "4", name: "Emily Davis", company: "Global Innovations LLC" },
  { id: "5", name: "David Wilson", company: "Enterprise Systems Corp" },
  { id: "6", name: "Lisa Anderson", company: "Strategic Consulting Group" },
];

export default function ClientSelector({
  value,
  onValueChange,
  placeholder = "Search clients...",
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClientData = clients.find((c) => c.id === value);
  const displayValue = selectedClientData
    ? `${selectedClientData.name} - ${selectedClientData.company}`
    : searchQuery;

  return (
    <Combobox
      value={value}
      onValueChange={(val) => {
        const newVal = val ?? "";
        onValueChange(newVal);
        if (newVal) {
          const client = clients.find((c) => c.id === newVal);
          if (client) setSearchQuery(`${client.name} - ${client.company}`);
        }
      }}
    >
      <ComboboxInput
        placeholder={placeholder}
        value={displayValue}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          if (value && e.target.value !== displayValue) {
            onValueChange("");
          }
        }}
        showClear
      />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No client found</ComboboxEmpty>
          {filteredClients.map((client) => (
            <ComboboxItem key={client.id} value={client.id}>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{client.name}</span>
                <span className="text-sm text-gray-500">{client.company}</span>
              </div>
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
