import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Bitcoin, Calculator, CreditCard, Shield } from "lucide-react";
import { type BitcoinPriceUpdate } from "@shared/schema";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const purchaseFormSchema = z.object({
  amount: z.string().min(1, "Please enter an amount"),
  walletAddress: z.string().min(26, "Please enter a valid Bitcoin wallet address").max(35),
});

type PurchaseFormData = z.infer<typeof purchaseFormSchema>;

const calculateFormSchema = z.object({
  usdAmount: z.string().min(1, "Please enter a USD amount"),
});

type CalculateFormData = z.infer<typeof calculateFormSchema>;

export default function BitcoinPurchase() {
  const [_, setLocation] = useLocation();
  const [calculatedBtc, setCalculatedBtc] = useState<string | null>(null);

  const { data: bitcoinPrice, isLoading } = useQuery<BitcoinPriceUpdate>({
    queryKey: ['/api/bitcoin/price'],
  });

  const purchaseForm = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      amount: "",
      walletAddress: "",
    },
  });

  const calculateForm = useForm<CalculateFormData>({
    resolver: zodResolver(calculateFormSchema),
    defaultValues: {
      usdAmount: "",
    },
  });

  const onPurchaseSubmit = (data: PurchaseFormData) => {
    console.log("Purchase form submitted:", data);
    // Here you would handle the actual Bitcoin purchase
    alert("Bitcoin purchase functionality would be implemented here");
  };

  const onCalculateSubmit = (data: CalculateFormData) => {
    if (!bitcoinPrice) return;
    
    const usdAmount = parseFloat(data.usdAmount);
    const btcPrice = parseFloat(bitcoinPrice.price);
    const btcAmount = usdAmount / btcPrice;
    
    setCalculatedBtc(btcAmount.toFixed(8)); // BTC to 8 decimal places
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Buy Bitcoin</h1>
          <p className="text-gray-600">
            Fast, secure, and simple Bitcoin purchases. No technical knowledge required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bitcoin className="mr-2 h-5 w-5" />
                  Bitcoin Purchase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="buy">Buy Bitcoin</TabsTrigger>
                    <TabsTrigger value="calculate">Calculate</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy">
                    <Form {...purchaseForm}>
                      <form onSubmit={purchaseForm.handleSubmit(onPurchaseSubmit)} className="space-y-4">
                        <FormField
                          control={purchaseForm.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>USD Amount to Spend</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                  <Input className="pl-7" type="number" min="50" step="10" placeholder="Enter USD amount" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={purchaseForm.control}
                          name="walletAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bitcoin Wallet Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your Bitcoin wallet address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Payment Information
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Payment methods will be displayed on the next step. We accept credit/debit cards and bank transfers.
                          </p>
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 text-primary mr-2" />
                            <span className="text-xs text-gray-500">Secure, encrypted payment processing</span>
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full mt-4">
                          Continue to Payment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="calculate">
                    <Form {...calculateForm}>
                      <form onSubmit={calculateForm.handleSubmit(onCalculateSubmit)} className="space-y-4">
                        <FormField
                          control={calculateForm.control}
                          name="usdAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>USD Amount</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                  <Input className="pl-7" type="number" min="1" step="1" placeholder="Enter USD amount" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          <Calculator className="mr-2 h-4 w-4" />
                          Calculate Bitcoin Amount
                        </Button>
                        
                        {calculatedBtc && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="font-medium text-gray-800 mb-1">Conversion Result</h3>
                            <div className="text-2xl font-bold text-primary">{calculatedBtc} BTC</div>
                            <p className="text-xs text-gray-500 mt-1">
                              Based on current Bitcoin price: {bitcoinPrice && formatCurrency(bitcoinPrice.price)}
                            </p>
                          </div>
                        )}
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="text-xs text-gray-500">
                All Bitcoin transactions are final and cannot be reversed. Please double-check your wallet address.
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Current Bitcoin Price</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div>
                    <Skeleton className="h-10 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 mb-4">
                      <Bitcoin className="h-6 w-6 text-[#F59E0B]" />
                      <div>
                        <div className="text-2xl font-bold">${bitcoinPrice?.price}</div>
                        <div className={`text-sm font-medium ${Number(bitcoinPrice?.changePercentage) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {Number(bitcoinPrice?.changePercentage) >= 0 ? '+' : ''}{bitcoinPrice?.changePercentage}%
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      Last updated: {bitcoinPrice ? formatDate(new Date(bitcoinPrice.updatedAt)) : ''}
                    </p>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-start">
                        <Shield className="text-primary mt-1 mr-3 h-5 w-5" />
                        <div>
                          <h4 className="font-medium text-gray-800">Secure Transactions</h4>
                          <p className="text-xs text-gray-600">End-to-end encryption for all purchases</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CreditCard className="text-primary mt-1 mr-3 h-5 w-5" />
                        <div>
                          <h4 className="font-medium text-gray-800">Multiple Payment Options</h4>
                          <p className="text-xs text-gray-600">Credit card, bank transfer, and more</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our crypto experts are available to assist you with your Bitcoin purchase.
              </p>
              <div className="flex items-center text-primary">
                <i className="fab fa-whatsapp mr-2 text-lg"></i>
                <span className="font-medium">Contact us on WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
