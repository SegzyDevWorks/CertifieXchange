import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-indigo-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Gift Cards & Bitcoin Made Simple</h1>
            <p className="text-lg mb-8 text-indigo-100">Purchase gift cards and Bitcoin securely. Fast delivery, competitive rates, expert support.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#giftcards">
                <a className="bg-white text-primary font-medium py-3 px-6 rounded-lg transition-all hover:bg-gray-100 text-center">
                  Browse Gift Cards
                </a>
              </Link>
              <Link href="#bitcoin">
                <a className="bg-[#F59E0B] text-white font-medium py-3 px-6 rounded-lg transition-all hover:bg-amber-600 text-center">
                  Buy Bitcoin
                </a>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <img 
              src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Gift cards and Bitcoin illustration" 
              className="rounded-lg shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
