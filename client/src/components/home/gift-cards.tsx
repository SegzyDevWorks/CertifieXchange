import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type GiftCard, type GiftCardCategory } from "@shared/schema";

function GiftCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <Skeleton className="w-full h-40" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-2/4 mb-3" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

function GiftCardItem({ giftCard }: { giftCard: GiftCard }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <img 
        src={giftCard.imageUrl} 
        alt={`${giftCard.name} Gift Card`} 
        className="w-full h-40 object-cover" 
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{giftCard.name}</h3>
        <p className="text-sm text-gray-500 mb-3">${giftCard.minAmount} - ${giftCard.maxAmount}</p>
        <Link href={`/gift-cards/${giftCard.id}`}>
          <Button className="w-full bg-primary text-white hover:bg-indigo-700">
            Select Options
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function GiftCards() {
  const [selectedCategory, setSelectedCategory] = useState<number>(1); // Default to "All" category

  const { data: categories, isLoading: isLoadingCategories } = useQuery<GiftCardCategory[]>({
    queryKey: ['/api/gift-card-categories'],
  });

  const { data: giftCards, isLoading: isLoadingGiftCards } = useQuery<GiftCard[]>({
    queryKey: ['/api/gift-cards'],
  });

  const filteredGiftCards = giftCards?.filter(card => 
    selectedCategory === 1 || card.categoryId === selectedCategory
  );

  return (
    <section id="giftcards" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Gift Cards</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from hundreds of popular retailers and restaurants. Digital delivery within minutes.
          </p>
        </div>
        
        {/* Mobile categories filter */}
        <div className="flex overflow-x-auto py-4 md:hidden">
          <div className="flex space-x-4 px-2">
            {isLoadingCategories ? (
              Array(5).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-9 w-32 rounded-full" />
              ))
            ) : (
              categories?.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap bg-white border ${
                    selectedCategory === category.id
                      ? "border-primary text-primary"
                      : "border-gray-200 hover:border-primary text-gray-700"
                  } rounded-full px-4 py-2 text-sm font-medium`}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>
        
        {/* Desktop categories filter */}
        <div className="hidden md:flex justify-center mb-8 space-x-4">
          {isLoadingCategories ? (
            Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-10 w-36 rounded-full" />
            ))
          ) : (
            categories?.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`bg-white border ${
                  selectedCategory === category.id
                    ? "border-primary text-primary"
                    : "border-gray-200 hover:border-primary text-gray-700"
                } rounded-full px-6 py-2 font-medium`}
              >
                {category.name}
              </button>
            ))
          )}
        </div>
        
        {/* Gift card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoadingGiftCards ? (
            Array(4).fill(0).map((_, index) => (
              <GiftCardSkeleton key={index} />
            ))
          ) : (
            filteredGiftCards?.map(giftCard => (
              <GiftCardItem key={giftCard.id} giftCard={giftCard} />
            ))
          )}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/gift-cards">
            <a className="inline-flex items-center text-primary font-medium hover:text-indigo-700">
              View All Gift Cards
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
