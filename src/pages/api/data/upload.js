import { setUploadedData } from "./store";
import { parseUploadedFile } from "@/lib/utils";
import multer from "multer";

// Configure multer for file storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Type guard to check if request is from multer
function isMulterRequest(req) {
  return req.file || (req.files && Object.keys(req.files).length > 0);
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Use multer to handle file upload
  upload.single("file")(req, res, function (err) {
    if (err) {
      res.status(400).json({
        error: "File upload failed",
        details: err.message,
      });
      return;
    }

    // Check if file was uploaded
    if (!isMulterRequest(req)) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    try {
      // Get the uploaded file
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      // Parse file content and extract metrics
      const metrics = parseUploadedFile(file.buffer);

      // Store processed metrics
      setUploadedData(metrics);

      res.status(200).json({
        success: true,
        message: "File processed and metrics stored successfully",
        metrics,
      });
    } catch (error) {
      console.error("File processing error:", error);
      res.status(500).json({
        error: "Failed to process uploaded file",
        details: error.message,
      });
    }
  });
}
