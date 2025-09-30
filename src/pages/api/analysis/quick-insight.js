export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // In a real implementation, you would analyze the data here
  // For this dummy backend, we'll just return a success response with insights
  res.status(200).json({
    success: true,
    insights:
      "Revenue growth is strong, profit margin remains healthy, and May showed a notable sales surge. Consider increasing marketing in Q3 to leverage positive trends.",
    analysis_type: "quick_insight",
    timestamp: Date.now(),
  });
}
