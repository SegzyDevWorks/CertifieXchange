import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import Home from "@/pages/home";
import GiftCardDetails from "@/pages/gift-card-details";
import BitcoinPurchase from "@/pages/bitcoin-purchase";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gift-cards/:id" component={GiftCardDetails} />
      <Route path="/bitcoin" component={BitcoinPurchase} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
