import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupAuth } from "./auth"; // Add this import

const app = express();
app.use(express.json());

// Basic health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

(async () => {
  try {
    // Setup auth before routes
    setupAuth(app);

    const server = await registerRoutes(app);

    // Setup Vite or serve static files
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Start server
    const PORT = 5000;
    server.listen(PORT, "0.0.0.0", () => {
      log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();