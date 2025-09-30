import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent({ revenueData, costData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Business Trends" },
    },
  };

  const revenueChart = {
    labels: revenueData?.labels || [],
    datasets: [
      {
        label: "Revenue",
        data: revenueData?.values || [],
        borderColor: "rgb(59 130 246)", // Tailwind blue-500
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const costChart = {
    labels: costData?.labels || [],
    datasets: [
      {
        label: "Costs",
        data: costData?.values || [],
        backgroundColor: "rgb(239 68 68)", // Tailwind red-500
      },
    ],
  };

  return (
    <div className="space-y-10">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Trends</h2>
        <Line options={options} data={revenueChart} />
      </div>
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Cost Analysis</h2>
        <Bar options={options} data={costChart} />
      </div>
    </div>
  );
}
