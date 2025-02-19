import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name"),
  industry: text("industry"),
});

export const websites = pgTable("websites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  template: text("template").notNull(),
  settings: json("settings").$type<{
    colors: string[];
    fonts: string[];
    logo?: string;
  }>(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // email, social, ad
  status: text("status").notNull(), // draft, scheduled, active, completed
  content: json("content").$type<{
    subject?: string;
    body: string;
    schedule?: string;
    platforms?: string[];
  }>(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertWebsiteSchema = createInsertSchema(websites);
export const insertCampaignSchema = createInsertSchema(campaigns);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertWebsite = z.infer<typeof insertWebsiteSchema>;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type User = typeof users.$inferSelect;
export type Website = typeof websites.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;