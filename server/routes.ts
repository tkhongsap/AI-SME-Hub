import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Website routes - no auth check for now
  app.get("/api/websites", async (_req, res) => {
    const websites = await storage.getWebsites(1); // Default to user ID 1 for testing
    res.json(websites);
  });

  app.post("/api/websites", async (req, res) => {
    const website = await storage.createWebsite({
      ...req.body,
      userId: 1, // Default to user ID 1 for testing
    });
    res.status(201).json(website);
  });

  const httpServer = createServer(app);
  return httpServer;
}