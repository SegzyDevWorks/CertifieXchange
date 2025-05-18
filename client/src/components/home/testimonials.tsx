import { useQuery } from "@tanstack/react-query";
import { Star, StarHalf } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Testimonial } from "@shared/schema";

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex text-[#F59E0B]">
      {Array(fullStars).fill(0).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-light p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-4">
        <RatingStars rating={testimonial.rating} />
      </div>
      <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
      <div className="flex items-center">
        <div className="mr-3 bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-gray-500 font-medium">{testimonial.initials}</span>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="bg-light p-6 rounded-lg shadow-sm border border-gray-100">
      <Skeleton className="h-4 w-20 mb-4" />
      <Skeleton className="h-20 w-full mb-4" />
      <div className="flex items-center">
        <Skeleton className="h-10 w-10 rounded-full mr-3" />
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here's what our satisfied customers have to say.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <TestimonialSkeleton key={index} />
            ))
          ) : (
            testimonials?.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
