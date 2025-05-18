import { Link } from "wouter";

export default function Cta() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to get started?</h2>
            <p className="text-indigo-200">Purchase gift cards or Bitcoin securely today. Our team is here to help.</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="#giftcards">
              <a className="bg-white text-primary font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors text-center">
                Browse Gift Cards
              </a>
            </Link>
            <Link href="#bitcoin">
              <a className="bg-[#F59E0B] text-white font-medium py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors text-center">
                Buy Bitcoin
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
