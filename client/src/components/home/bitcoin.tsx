import { useQuery } from "@tanstack/react-query";
import { Check, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { type BitcoinPriceUpdate } from "@shared/schema";
import { formatDate } from "@/lib/utils";

interface BenefitProps {
  title: string;
  description: string;
}

function Benefit({ title, description }: BenefitProps) {
  return (
    <div className="flex items-start">
      <div className="text-primary mt-1 mr-3">
        <Check className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function BitcoinSection() {
  const { data: bitcoinPrice, isLoading } = useQuery<BitcoinPriceUpdate>({
    queryKey: ['/api/bitcoin/price'],
  });

  return (
    <section id="bitcoin" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Buy Bitcoin Easily</h2>
            <p className="text-gray-600 mb-6">
              Start your cryptocurrency journey with GiftBit. We make buying Bitcoin simple, secure, and accessible for everyone.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Current Bitcoin Price</h3>
              {isLoading ? (
                <div>
                  <Skeleton className="h-8 w-36 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold">${bitcoinPrice?.price}</span>
                    <span className={`text-sm font-medium ${Number(bitcoinPrice?.changePercentage) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {Number(bitcoinPrice?.changePercentage) >= 0 ? '+' : ''}{bitcoinPrice?.changePercentage}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Last updated: {bitcoinPrice ? formatDate(new Date(bitcoinPrice.updatedAt)) : ''}
                  </p>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <Benefit 
                title="No Technical Knowledge Required" 
                description="Our platform handles all the technical details so you can focus on your investment."
              />
              
              <Benefit 
                title="Fast & Secure Transactions" 
                description="Buy Bitcoin with confidence knowing your transaction is protected by industry-leading security."
              />
              
              <Benefit 
                title="Dedicated Support" 
                description="Our crypto experts are available via WhatsApp to guide you through the process."
              />
            </div>
            
            <Link href="/bitcoin">
              <Button className="mt-8 bg-[#F59E0B] hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg">
                <Bitcoin className="mr-2 h-5 w-5" />
                Start Buying Bitcoin
              </Button>
            </Link>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <img 
              src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Bitcoin illustration" 
              className="rounded-lg shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
