import { Shield, Zap, Headphones } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-light p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-primary text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose GiftBit?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We combine convenience, security, and exceptional customer service for all your gift card and Bitcoin needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<Shield className="h-8 w-8" />}
            title="Secure Transactions"
            description="End-to-end encryption and secure payment processing for your peace of mind."
          />
          
          <Feature
            icon={<Zap className="h-8 w-8" />}
            title="Instant Delivery"
            description="Receive digital gift cards and Bitcoin purchases instantly in your email or wallet."
          />
          
          <Feature
            icon={<Headphones className="h-8 w-8" />}
            title="24/7 Support"
            description="Our dedicated team is always available via WhatsApp to assist you with any questions."
          />
        </div>
      </div>
    </section>
  );
}
