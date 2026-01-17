import path from "path";
import { fileURLToPath } from "url";

// Fix path resolution for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadResume = (req, res) => {
  try {
    // Navigate up two levels (../../) from controllers folder to root, then into 'files'
    const filePath = path.join(__dirname, "../files", "Resume.pdf");

    res.download(filePath, "Yadnyesh_Borole_Resume.pdf", (err) => {
      if (err) {
        console.error("Download Error:", err);
        res.status(500).send("Could not find resume file.");
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server Error");
  }
};