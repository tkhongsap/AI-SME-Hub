import { User, InsertUser, Website, InsertWebsite, Campaign, InsertCampaign } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Website operations
  getWebsites(userId: number): Promise<Website[]>;
  createWebsite(website: InsertWebsite): Promise<Website>;

  // Campaign operations
  getCampaigns(userId: number): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private websites: Map<number, Website>;
  private campaigns: Map<number, Campaign>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.websites = new Map();
    this.campaigns = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      companyName: insertUser.companyName ?? null,
      industry: insertUser.industry ?? null,
    };
    this.users.set(id, user);
    return user;
  }

  async getWebsites(userId: number): Promise<Website[]> {
    return Array.from(this.websites.values()).filter(
      (website) => website.userId === userId,
    );
  }

  async createWebsite(insertWebsite: InsertWebsite): Promise<Website> {
    const id = this.currentId++;
    const website: Website = {
      id,
      userId: insertWebsite.userId,
      name: insertWebsite.name,
      template: insertWebsite.template,
      settings: insertWebsite.settings ?? {
        colors: [],
        fonts: [],
      },
    };
    this.websites.set(id, website);
    return website;
  }

  async getCampaigns(userId: number): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(
      (campaign) => campaign.userId === userId,
    );
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.currentId++;
    const campaign: Campaign = {
      id,
      userId: insertCampaign.userId,
      name: insertCampaign.name,
      type: insertCampaign.type,
      status: insertCampaign.status,
      content: insertCampaign.content ?? {
        body: "",
      },
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }
}

export const storage = new MemStorage();