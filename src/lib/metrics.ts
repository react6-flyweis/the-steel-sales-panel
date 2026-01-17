import type { Period } from "@/components/FilterTabs";

export type DashboardMetrics = {
  totalLeads: number;
  leadsClosed: number;
  followUpsPending: number;
  aiEscalations: number;
};

// Mocked metrics provider. Replace with real API calls when available.
export async function getDashboardMetrics(
  period: Period,
): Promise<DashboardMetrics> {
  // Simulate small network delay
  await new Promise((r) => setTimeout(r, 80));

  switch (period) {
    case "week":
      return {
        totalLeads: 24,
        leadsClosed: 8,
        followUpsPending: 12,
        aiEscalations: 5,
      };
    case "month":
      return {
        totalLeads: 184,
        leadsClosed: 56,
        followUpsPending: 72,
        aiEscalations: 18,
      };
    case "quarter":
    default:
      return {
        totalLeads: 740,
        leadsClosed: 238,
        followUpsPending: 312,
        aiEscalations: 68,
      };
  }
}
