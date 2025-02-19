import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Website routes
  app.get("/api/websites", async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const websites = await storage.getWebsites(req.user.id);
    res.json(websites);
  });

  app.post("/api/websites", async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const website = await storage.createWebsite({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(website);
  });

  // Campaign routes
  app.get("/api/campaigns", async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const campaigns = await storage.getCampaigns(req.user.id);
    res.json(campaigns);
  });

  app.post("/api/campaigns", async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    const campaign = await storage.createCampaign({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(campaign);
  });

  const httpServer = createServer(app);
  return httpServer;
}