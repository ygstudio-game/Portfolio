import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Route Files
import contactRoutes from "./routes/contact.routes.js";
import resumeRoutes from "./routes/resume.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({
    origin: process.env.DEVELOPMENT === "true" 
      ? process.env.Frontend_URL_Dev 
      : process.env.Frontend_URL_Prod,
    credentials: true
}));
app.use(express.json());

// --- Register Routes ---
// This prefixes all routes with /api
app.use("/api", contactRoutes); // -> /api/contact
app.use("/api", resumeRoutes);  // -> /api/resume

// Health Check (Optional, good for deployment testing)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});