import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { type FaqItem } from "@shared/schema";

function FaqItemComponent({ faqItem }: { faqItem: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button 
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-800">{faqItem.question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200">
          <p className="text-gray-600">{faqItem.answer}</p>
        </div>
      )}
    </div>
  );
}

function FaqSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const { data: faqItems, isLoading } = useQuery<FaqItem[]>({
    queryKey: ['/api/faq'],
  });

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to our most commonly asked questions. Can't find what you're looking for? Contact us via WhatsApp.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <FaqSkeleton key={index} />
            ))
          ) : (
            faqItems?.map(faqItem => (
              <FaqItemComponent key={faqItem.id} faqItem={faqItem} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
