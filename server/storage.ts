import {
  users, type User, type InsertUser,
  giftCardCategories, type GiftCardCategory, type InsertGiftCardCategory,
  giftCards, type GiftCard, type InsertGiftCard,
  bitcoinPriceUpdates, type BitcoinPriceUpdate, type InsertBitcoinPriceUpdate,
  faqItems, type FaqItem, type InsertFaqItem,
  testimonials, type Testimonial, type InsertTestimonial,
  newsletterSubscribers, type NewsletterSubscriber, type InsertNewsletterSubscriber
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Gift Card Categories
  getAllGiftCardCategories(): Promise<GiftCardCategory[]>;
  getGiftCardCategory(id: number): Promise<GiftCardCategory | undefined>;
  createGiftCardCategory(category: InsertGiftCardCategory): Promise<GiftCardCategory>;

  // Gift Cards
  getAllGiftCards(): Promise<GiftCard[]>;
  getGiftCard(id: number): Promise<GiftCard | undefined>;
  getGiftCardsByCategoryId(categoryId: number): Promise<GiftCard[]>;
  getFeaturedGiftCards(): Promise<GiftCard[]>;
  createGiftCard(giftCard: InsertGiftCard): Promise<GiftCard>;

  // Bitcoin Price Updates
  getLatestBitcoinPriceUpdate(): Promise<BitcoinPriceUpdate | undefined>;
  createBitcoinPriceUpdate(update: InsertBitcoinPriceUpdate): Promise<BitcoinPriceUpdate>;

  // FAQ Items
  getAllFaqItems(): Promise<FaqItem[]>;
  getFaqItem(id: number): Promise<FaqItem | undefined>;
  createFaqItem(faqItem: InsertFaqItem): Promise<FaqItem>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Newsletter Subscribers
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private giftCardCategories: Map<number, GiftCardCategory>;
  private giftCards: Map<number, GiftCard>;
  private bitcoinPriceUpdates: Map<number, BitcoinPriceUpdate>;
  private faqItems: Map<number, FaqItem>;
  private testimonials: Map<number, Testimonial>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;

  private userCurrentId: number;
  private giftCardCategoryCurrentId: number;
  private giftCardCurrentId: number;
  private bitcoinPriceUpdateCurrentId: number;
  private faqItemCurrentId: number;
  private testimonialCurrentId: number;
  private newsletterSubscriberCurrentId: number;

  constructor() {
    this.users = new Map();
    this.giftCardCategories = new Map();
    this.giftCards = new Map();
    this.bitcoinPriceUpdates = new Map();
    this.faqItems = new Map();
    this.testimonials = new Map();
    this.newsletterSubscribers = new Map();

    this.userCurrentId = 1;
    this.giftCardCategoryCurrentId = 1;
    this.giftCardCurrentId = 1;
    this.bitcoinPriceUpdateCurrentId = 1;
    this.faqItemCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.newsletterSubscriberCurrentId = 1;

    // Initialize with sample data
    this.initSampleData();
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Gift Card Categories
  async getAllGiftCardCategories(): Promise<GiftCardCategory[]> {
    return Array.from(this.giftCardCategories.values());
  }

  async getGiftCardCategory(id: number): Promise<GiftCardCategory | undefined> {
    return this.giftCardCategories.get(id);
  }

  async createGiftCardCategory(insertCategory: InsertGiftCardCategory): Promise<GiftCardCategory> {
    const id = this.giftCardCategoryCurrentId++;
    const category: GiftCardCategory = { ...insertCategory, id };
    this.giftCardCategories.set(id, category);
    return category;
  }

  // Gift Cards
  async getAllGiftCards(): Promise<GiftCard[]> {
    return Array.from(this.giftCards.values());
  }

  async getGiftCard(id: number): Promise<GiftCard | undefined> {
    return this.giftCards.get(id);
  }

  async getGiftCardsByCategoryId(categoryId: number): Promise<GiftCard[]> {
    return Array.from(this.giftCards.values()).filter(
      (giftCard) => giftCard.categoryId === categoryId,
    );
  }

  async getFeaturedGiftCards(): Promise<GiftCard[]> {
    return Array.from(this.giftCards.values()).filter(
      (giftCard) => giftCard.featured === true,
    );
  }

  async createGiftCard(insertGiftCard: InsertGiftCard): Promise<GiftCard> {
    const id = this.giftCardCurrentId++;
    const giftCard: GiftCard = { ...insertGiftCard, id };
    this.giftCards.set(id, giftCard);
    return giftCard;
  }

  // Bitcoin Price Updates
  async getLatestBitcoinPriceUpdate(): Promise<BitcoinPriceUpdate | undefined> {
    const updates = Array.from(this.bitcoinPriceUpdates.values());
    if (updates.length === 0) return undefined;
    return updates[updates.length - 1];
  }

  async createBitcoinPriceUpdate(insertUpdate: InsertBitcoinPriceUpdate): Promise<BitcoinPriceUpdate> {
    const id = this.bitcoinPriceUpdateCurrentId++;
    const update: BitcoinPriceUpdate = { ...insertUpdate, id };
    this.bitcoinPriceUpdates.set(id, update);
    return update;
  }

  // FAQ Items
  async getAllFaqItems(): Promise<FaqItem[]> {
    return Array.from(this.faqItems.values()).sort((a, b) => a.order - b.order);
  }

  async getFaqItem(id: number): Promise<FaqItem | undefined> {
    return this.faqItems.get(id);
  }

  async createFaqItem(insertFaqItem: InsertFaqItem): Promise<FaqItem> {
    const id = this.faqItemCurrentId++;
    const faqItem: FaqItem = { ...insertFaqItem, id };
    this.faqItems.set(id, faqItem);
    return faqItem;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Newsletter Subscribers
  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const existing = await this.getNewsletterSubscriberByEmail(insertSubscriber.email);
    if (existing) return existing;

    const id = this.newsletterSubscriberCurrentId++;
    const subscriber: NewsletterSubscriber = { ...insertSubscriber, id };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    return Array.from(this.newsletterSubscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }

  // Initialize with sample data
  private initSampleData() {
    // Gift Card Categories
    const categories = [
      { name: "All Categories", slug: "all" },
      { name: "Shopping", slug: "shopping" },
      { name: "Entertainment", slug: "entertainment" },
      { name: "Dining", slug: "dining" },
      { name: "Gaming", slug: "gaming" }
    ];

    categories.forEach(category => {
      this.createGiftCardCategory(category);
    });

    // Gift Cards
    const giftCards = [
      {
        name: "Amazon Gift Card",
        description: "Use Amazon Gift Cards to purchase millions of items across Amazon.",
        imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 2, // Shopping
        minAmount: "25",
        maxAmount: "500",
        featured: true
      },
      {
        name: "Netflix Gift Card",
        description: "Give the gift of entertainment with Netflix Gift Cards.",
        imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 3, // Entertainment
        minAmount: "25",
        maxAmount: "100",
        featured: true
      },
      {
        name: "Starbucks Gift Card",
        description: "Perfect for coffee lovers and casual meetups.",
        imageUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 4, // Dining
        minAmount: "10",
        maxAmount: "100",
        featured: true
      },
      {
        name: "Steam Gift Card",
        description: "Access to thousands of games on the Steam platform.",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 5, // Gaming
        minAmount: "20",
        maxAmount: "100",
        featured: true
      }
    ];

    giftCards.forEach(giftCard => {
      this.createGiftCard(giftCard);
    });

    // Bitcoin Price Update
    this.createBitcoinPriceUpdate({
      price: "45678.90",
      changePercentage: "2.34",
      updatedAt: new Date().toISOString()
    });

    // FAQ Items
    const faqItems = [
      {
        question: "How quickly will I receive my gift card?",
        answer: "Most gift cards are delivered instantly to your email after purchase. In rare cases, it might take up to 24 hours. You can always check the status of your order in your account or contact our support via WhatsApp.",
        order: 1
      },
      {
        question: "Is it safe to buy Bitcoin through your platform?",
        answer: "Yes, we implement industry-standard security measures to protect all transactions. We use secure payment processors and follow strict verification procedures to ensure the safety of your purchases.",
        order: 2
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including credit/debit cards, bank transfers, and selected cryptocurrencies. The available payment options will be displayed during the checkout process.",
        order: 3
      },
      {
        question: "How can I contact your customer support?",
        answer: "Our dedicated support team is available 24/7 via WhatsApp. You can also email us at support@giftbit.com or use the contact form on our website. We typically respond within minutes on WhatsApp.",
        order: 4
      }
    ];

    faqItems.forEach(faqItem => {
      this.createFaqItem(faqItem);
    });

    // Testimonials
    const testimonials = [
      {
        name: "John Doe",
        role: "Bitcoin Customer",
        content: "The easiest way to buy Bitcoin I've ever found. The WhatsApp support answered all my questions instantly. Highly recommended!",
        rating: 5,
        initials: "JD"
      },
      {
        name: "Jane Smith",
        role: "Gift Card Customer",
        content: "I needed a last-minute gift card for my nephew's birthday and GiftBit delivered it instantly. The process was smooth and hassle-free.",
        rating: 5,
        initials: "JS"
      },
      {
        name: "Robert Johnson",
        role: "New Crypto Investor",
        content: "As a first-time Bitcoin buyer, I was nervous. The team at GiftBit guided me through every step. Their customer service is unmatched!",
        rating: 4,
        initials: "RJ"
      }
    ];

    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Gift Card Categories
  async getAllGiftCardCategories(): Promise<GiftCardCategory[]> {
    return await db.select().from(giftCardCategories);
  }

  async getGiftCardCategory(id: number): Promise<GiftCardCategory | undefined> {
    const [category] = await db.select().from(giftCardCategories).where(eq(giftCardCategories.id, id));
    return category || undefined;
  }

  async createGiftCardCategory(insertCategory: InsertGiftCardCategory): Promise<GiftCardCategory> {
    const [category] = await db.insert(giftCardCategories).values(insertCategory).returning();
    return category;
  }

  // Gift Cards
  async getAllGiftCards(): Promise<GiftCard[]> {
    return await db.select().from(giftCards);
  }

  async getGiftCard(id: number): Promise<GiftCard | undefined> {
    const [giftCard] = await db.select().from(giftCards).where(eq(giftCards.id, id));
    return giftCard || undefined;
  }

  async getGiftCardsByCategoryId(categoryId: number): Promise<GiftCard[]> {
    return await db.select().from(giftCards).where(eq(giftCards.categoryId, categoryId));
  }

  async getFeaturedGiftCards(): Promise<GiftCard[]> {
    return await db.select().from(giftCards).where(eq(giftCards.featured, true));
  }

  async createGiftCard(insertGiftCard: InsertGiftCard): Promise<GiftCard> {
    const [giftCard] = await db.insert(giftCards).values(insertGiftCard).returning();
    return giftCard;
  }

  // Bitcoin Price Updates
  async getLatestBitcoinPriceUpdate(): Promise<BitcoinPriceUpdate | undefined> {
    const [update] = await db.select().from(bitcoinPriceUpdates).orderBy(desc(bitcoinPriceUpdates.id)).limit(1);
    return update || undefined;
  }

  async createBitcoinPriceUpdate(insertUpdate: InsertBitcoinPriceUpdate): Promise<BitcoinPriceUpdate> {
    const [update] = await db.insert(bitcoinPriceUpdates).values(insertUpdate).returning();
    return update;
  }

  // FAQ Items
  async getAllFaqItems(): Promise<FaqItem[]> {
    return await db.select().from(faqItems).orderBy(faqItems.order);
  }

  async getFaqItem(id: number): Promise<FaqItem | undefined> {
    const [faqItem] = await db.select().from(faqItems).where(eq(faqItems.id, id));
    return faqItem || undefined;
  }

  async createFaqItem(insertFaqItem: InsertFaqItem): Promise<FaqItem> {
    const [faqItem] = await db.insert(faqItems).values(insertFaqItem).returning();
    return faqItem;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  // Newsletter Subscribers
  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const existing = await this.getNewsletterSubscriberByEmail(insertSubscriber.email);
    if (existing) return existing;

    const [subscriber] = await db.insert(newsletterSubscribers).values(insertSubscriber).returning();
    return subscriber;
  }

  async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    const [subscriber] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
    return subscriber || undefined;
  }

  // Method to initialize sample data if needed
  async initSampleData() {
    const categoriesCount = await db.select().from(giftCardCategories).limit(1);
    if (categoriesCount.length > 0) {
      return; // Data already exists
    }

    // Gift Card Categories
    const categories = [
      { name: "All Categories", slug: "all" },
      { name: "Shopping", slug: "shopping" },
      { name: "Entertainment", slug: "entertainment" },
      { name: "Dining", slug: "dining" },
      { name: "Gaming", slug: "gaming" }
    ];

    for (const category of categories) {
      await this.createGiftCardCategory(category);
    }

    // Gift Cards
    const giftCards = [
      {
        name: "Amazon Gift Card",
        description: "Use Amazon Gift Cards to purchase millions of items across Amazon.",
        imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 2, // Shopping
        minAmount: "25",
        maxAmount: "500",
        featured: true
      },
      {
        name: "Netflix Gift Card",
        description: "Give the gift of entertainment with Netflix Gift Cards.",
        imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 3, // Entertainment
        minAmount: "25",
        maxAmount: "100",
        featured: true
      },
      {
        name: "Starbucks Gift Card",
        description: "Perfect for coffee lovers and casual meetups.",
        imageUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 4, // Dining
        minAmount: "10",
        maxAmount: "100",
        featured: true
      },
      {
        name: "Steam Gift Card",
        description: "Access to thousands of games on the Steam platform.",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        categoryId: 5, // Gaming
        minAmount: "20",
        maxAmount: "100",
        featured: true
      }
    ];

    for (const giftCard of giftCards) {
      await this.createGiftCard(giftCard);
    }

    // Bitcoin Price Update
    await this.createBitcoinPriceUpdate({
      price: "45678.90",
      changePercentage: "2.34",
      updatedAt: new Date().toISOString()
    });

    // FAQ Items
    const faqItems = [
      {
        question: "How quickly will I receive my gift card?",
        answer: "Most gift cards are delivered instantly to your email after purchase. In rare cases, it might take up to 24 hours. You can always check the status of your order in your account or contact our support via WhatsApp.",
        order: 1
      },
      {
        question: "Is it safe to buy Bitcoin through your platform?",
        answer: "Yes, we implement industry-standard security measures to protect all transactions. We use secure payment processors and follow strict verification procedures to ensure the safety of your purchases.",
        order: 2
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including credit/debit cards, bank transfers, and selected cryptocurrencies. The available payment options will be displayed during the checkout process.",
        order: 3
      },
      {
        question: "How can I contact your customer support?",
        answer: "Our dedicated support team is available 24/7 via WhatsApp. You can also email us at support@giftbit.com or use the contact form on our website. We typically respond within minutes on WhatsApp.",
        order: 4
      }
    ];

    for (const faqItem of faqItems) {
      await this.createFaqItem(faqItem);
    }

    // Testimonials
    const testimonials = [
      {
        name: "John Doe",
        role: "Bitcoin Customer",
        content: "The easiest way to buy Bitcoin I've ever found. The WhatsApp support answered all my questions instantly. Highly recommended!",
        rating: 5,
        initials: "JD"
      },
      {
        name: "Jane Smith",
        role: "Gift Card Customer",
        content: "I needed a last-minute gift card for my nephew's birthday and GiftBit delivered it instantly. The process was smooth and hassle-free.",
        rating: 5,
        initials: "JS"
      },
      {
        name: "Robert Johnson",
        role: "New Crypto Investor",
        content: "As a first-time Bitcoin buyer, I was nervous. The team at GiftBit guided me through every step. Their customer service is unmatched!",
        rating: 4,
        initials: "RJ"
      }
    ];

    for (const testimonial of testimonials) {
      await this.createTestimonial(testimonial);
    }
  }
}

// Create and export an instance of the DatabaseStorage class
export const storage = new DatabaseStorage();

// Initialize sample data
storage.initSampleData().catch(err => {
  console.error("Error initializing sample data:", err);
});
