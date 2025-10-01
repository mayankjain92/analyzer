// "use client";
// import { useEffect, useState } from "react";
// import NavBar from "@/components/NavBar";
// import ChartComponent from "@/components/ChartComponent";
// import AIInsightPanel from "@/components/AIInsightPanel";
// import { getDashboardMetrics, getQuickInsight } from "@/lib/utils";

// export default function DashboardPage() {
//   const [metrics, setMetrics] = useState(null);
//   const [insight, setInsight] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         // Fetch metrics for charts
//         const metricRes = await getDashboardMetrics();
//         setMetrics(metricRes.data);

//         // Request quick AI insight
//         const insightRes = await getQuickInsight(metricRes.data);
//         setInsight(insightRes.data.insights);
//       } catch (err) {
//         console.error("Error loading dashboard data", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#1a1a1a]">
//       <NavBar />
//       <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {loading && (
//           <div className="col-span-full text-center text-gray-600">
//             Loading dashboard...
//           </div>
//         )}
//         {!loading && metrics && (
//           <>
//             <div className="lg:col-span-2">
//               <ChartComponent
//                 revenueData={metrics?.revenue}
//                 costData={metrics?.costs}
//               />
//             </div>
//             <AIInsightPanel insight={insight} />
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import ChartComponent from "@/components/ChartComponent";
import AIInsightPanel from "@/components/AIInsightPanel";
import { getDashboardMetrics, getQuickInsight } from "@/lib/utils";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleEditClick = () => {
    router.push("/business-data?edit=true");
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <NavBar />
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="col-span-full text-center text-gray-600">
            Loading dashboard...
          </div>
        )}
        {!loading && metrics && (
          <>
            {/* Edit Data Button */}
            <div className="col-span-full flex justify-end">
              <button
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Edit Data
              </button>
            </div>

            {/* Charts */}
            <div className="lg:col-span-2">
              <ChartComponent
                revenueData={metrics.revenue}
                costData={metrics.costs}
              />
            </div>

            {/* AI Insights */}
            <AIInsightPanel insight={insight} />
          </>
        )}
      </main>
    </div>
  );
}
