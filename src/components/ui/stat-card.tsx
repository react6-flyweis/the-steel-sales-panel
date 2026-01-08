import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  // `color` may be a Tailwind background class like 'bg-blue-600' or a CSS color string like '#1e40af'
  color?: string;
  className?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn("p-5 rounded-md text-white border-none", className, color)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-xl md:text-2xl mt-1">{value}</p>
        </div>

        <div className="shrink-0 bg-white p-2 rounded-md">{icon}</div>
      </div>
    </Card>
  );
}
