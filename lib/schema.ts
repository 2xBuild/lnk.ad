
import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  originalUrl: text("original_url").notNull(),
  shortCode: text("short_code").notNull().unique(),
  expiresAt: timestamp("expires_at"),
  clicks: integer("clicks").default(0).notNull(),
});
