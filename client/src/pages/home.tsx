import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import GiftCards from "@/components/home/gift-cards";
import BitcoinSection from "@/components/home/bitcoin";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";
import Newsletter from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <GiftCards />
      <BitcoinSection />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Cta />
      <Newsletter />
    </>
  );
}
