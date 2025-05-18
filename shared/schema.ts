import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Gift Card Categories
export const giftCardCategories = pgTable("gift_card_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertGiftCardCategorySchema = createInsertSchema(giftCardCategories).pick({
  name: true,
  slug: true,
});

export type InsertGiftCardCategory = z.infer<typeof insertGiftCardCategorySchema>;
export type GiftCardCategory = typeof giftCardCategories.$inferSelect;

// Gift Cards
export const giftCards = pgTable("gift_cards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  categoryId: integer("category_id").notNull().references(() => giftCardCategories.id),
  minAmount: decimal("min_amount").notNull(),
  maxAmount: decimal("max_amount").notNull(),
  featured: boolean("featured").default(false),
});

export const insertGiftCardSchema = createInsertSchema(giftCards).pick({
  name: true,
  description: true,
  imageUrl: true,
  categoryId: true,
  minAmount: true,
  maxAmount: true,
  featured: true,
});

export type InsertGiftCard = z.infer<typeof insertGiftCardSchema>;
export type GiftCard = typeof giftCards.$inferSelect;

// Bitcoin Price Updates
export const bitcoinPriceUpdates = pgTable("bitcoin_price_updates", {
  id: serial("id").primaryKey(),
  price: decimal("price").notNull(),
  changePercentage: decimal("change_percentage").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const insertBitcoinPriceUpdateSchema = createInsertSchema(bitcoinPriceUpdates).pick({
  price: true,
  changePercentage: true,
  updatedAt: true,
});

export type InsertBitcoinPriceUpdate = z.infer<typeof insertBitcoinPriceUpdateSchema>;
export type BitcoinPriceUpdate = typeof bitcoinPriceUpdates.$inferSelect;

// FAQ Items
export const faqItems = pgTable("faq_items", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull(),
});

export const insertFaqItemSchema = createInsertSchema(faqItems).pick({
  question: true,
  answer: true,
  order: true,
});

export type InsertFaqItem = z.infer<typeof insertFaqItemSchema>;
export type FaqItem = typeof faqItems.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  initials: text("initials").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  role: true,
  content: true,
  rating: true,
  initials: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Newsletter Subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true,
});

export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// Define relations
export const giftCardCategoriesRelations = relations(giftCardCategories, ({ many }) => ({
  giftCards: many(giftCards),
}));

export const giftCardsRelations = relations(giftCards, ({ one }) => ({
  category: one(giftCardCategories, {
    fields: [giftCards.categoryId],
    references: [giftCardCategories.id],
  }),
}));
