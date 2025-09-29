"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/ui/NavBar";
import ChartComponent from "@/components/ui/ChartComponent";
import AIInsightPanel from "@/components/ui/AIInsightPanel";
import { getDashboardMetrics, getQuickInsight } from "@/lib/utils";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch metrics for charts
        const metricRes = await getDashboardMetrics();
        setMetrics(metricRes.data);

        // Request quick AI insight
        const insightRes = await getQuickInsight(metricRes.data);
        setInsight(insightRes.data.insights);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="col-span-full text-center text-gray-600">
            Loading dashboard...
          </div>
        )}
        {!loading && metrics && (
          <>
            <div className="lg:col-span-2">
              <ChartComponent
                revenueData={metrics?.revenue}
                costData={metrics?.costs}
              />
            </div>
            <AIInsightPanel insight={insight} />
          </>
        )}
      </main>
    </div>
  );
}
