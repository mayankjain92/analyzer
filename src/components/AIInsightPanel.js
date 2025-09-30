export default function AIInsightPanel({ insight }) {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
      <pre className="whitespace-pre-wrap text-gray-700">
        {insight || "No insights available"}
      </pre>
    </div>
  );
}
