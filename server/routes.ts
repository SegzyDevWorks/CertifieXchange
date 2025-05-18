import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for gift card categories
  app.get("/api/gift-card-categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getAllGiftCardCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gift card categories" });
    }
  });

  // API routes for gift cards
  app.get("/api/gift-cards", async (_req: Request, res: Response) => {
    try {
      const giftCards = await storage.getAllGiftCards();
      res.json(giftCards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gift cards" });
    }
  });

  app.get("/api/gift-cards/featured", async (_req: Request, res: Response) => {
    try {
      const featuredGiftCards = await storage.getFeaturedGiftCards();
      res.json(featuredGiftCards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured gift cards" });
    }
  });

  app.get("/api/gift-cards/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid gift card ID" });
      }

      const giftCard = await storage.getGiftCard(id);
      if (!giftCard) {
        return res.status(404).json({ message: "Gift card not found" });
      }

      res.json(giftCard);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gift card" });
    }
  });

  app.get("/api/gift-cards/category/:categoryId", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const giftCards = await storage.getGiftCardsByCategoryId(categoryId);
      res.json(giftCards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gift cards by category" });
    }
  });

  // API route for latest Bitcoin price
  app.get("/api/bitcoin/price", async (_req: Request, res: Response) => {
    try {
      const latestPrice = await storage.getLatestBitcoinPriceUpdate();
      if (!latestPrice) {
        return res.status(404).json({ message: "No Bitcoin price data available" });
      }
      res.json(latestPrice);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Bitcoin price" });
    }
  });

  // API route for FAQ items
  app.get("/api/faq", async (_req: Request, res: Response) => {
    try {
      const faqItems = await storage.getAllFaqItems();
      res.json(faqItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch FAQ items" });
    }
  });

  // API route for testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // API route for newsletter subscription
  app.post("/api/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validatedData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
