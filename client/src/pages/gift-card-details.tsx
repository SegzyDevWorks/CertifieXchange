import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type GiftCard } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const formSchema = z.object({
  amount: z.string().min(1, "Please select an amount"),
  quantity: z.string().min(1, "Quantity is required"),
  recipientEmail: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GiftCardDetails() {
  const { id } = useParams();
  const [_, setLocation] = useLocation();

  const { data: giftCard, isLoading, error } = useQuery<GiftCard>({
    queryKey: [`/api/gift-cards/${id}`],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      quantity: "1",
      recipientEmail: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Here you would handle the actual gift card purchase
    alert("Gift card purchase functionality would be implemented here");
  };

  useEffect(() => {
    if (error) {
      setLocation("/");
    }
  }, [error, setLocation]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gift Cards
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-72 w-full rounded-lg" />
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-8" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!giftCard) {
    return null;
  }

  // Generate amount options based on min and max amounts
  const minAmount = parseFloat(giftCard.minAmount);
  const maxAmount = parseFloat(giftCard.maxAmount);
  const step = minAmount < 50 ? 10 : 25;
  const amountOptions = [];
  
  for (let amount = minAmount; amount <= maxAmount; amount += step) {
    amountOptions.push(amount);
  }
  
  // If maxAmount isn't in the array, add it
  if (amountOptions[amountOptions.length - 1] !== maxAmount) {
    amountOptions.push(maxAmount);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gift Cards
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={giftCard.imageUrl} 
              alt={`${giftCard.name} Gift Card`} 
              className="w-full h-auto rounded-lg shadow-md" 
            />
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">About {giftCard.name}</h3>
              <p className="text-gray-600">{giftCard.description}</p>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{giftCard.name} Gift Card</CardTitle>
                <CardDescription>Digital delivery within minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gift Card Amount</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select amount" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {amountOptions.map((amount) => (
                                <SelectItem key={amount} value={amount.toString()}>
                                  {formatCurrency(amount)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="recipientEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Where should we send the gift card?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Message (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Add a personal note" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  
                    <Button type="submit" className="w-full mt-6">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Secure transaction. Instant delivery to recipient's email.
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
