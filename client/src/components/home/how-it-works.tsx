interface StepProps {
  number: number;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="text-center">
      <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple steps to purchase gift cards and Bitcoin through our secure platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step 
            number={1} 
            title="Choose Your Product" 
            description="Browse our selection of gift cards or select Bitcoin purchase options."
          />
          
          <Step 
            number={2} 
            title="Secure Payment" 
            description="Complete your purchase with our secure payment options and verification."
          />
          
          <Step 
            number={3} 
            title="Instant Delivery" 
            description="Receive your digital products immediately via email or in your wallet."
          />
        </div>
      </div>
    </section>
  );
}
