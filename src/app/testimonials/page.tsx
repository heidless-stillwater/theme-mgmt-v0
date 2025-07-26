import { Card, CardContent } from '@/components/ui/card';
import { Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const allTestimonials = [
  { quote: "Plumbing Co. was a lifesaver! They arrived on time, fixed my leaky faucet in minutes, and were incredibly professional. Highly recommend!", name: "Sarah L.", location: "Pipe Creek", rating: 5, hint: "woman smiling" },
  { quote: "I had a major plumbing emergency and their team responded immediately, even after hours. Their quick work saved me from a disaster. Thank you!", name: "Mike R.", location: "Watertown", rating: 5, hint: "man portrait" },
  { quote: "Professional, courteous, and transparent pricing. They explained the issue clearly and gave me options without any pressure. Will use them for all my plumbing needs.", name: "David Chen", location: "Flowing Wells", rating: 5, hint: "asian man" },
  { quote: "The installation of our new water heater was seamless. The team was clean, efficient, and very respectful of our home.", name: "Emily G.", location: "Pipe Creek", rating: 5, hint: "young woman" },
  { quote: "Fair prices and excellent work. They fixed a clog that two other plumbers couldn't. I'm very impressed with their expertise.", name: "Tom H.", location: "Watertown", rating: 5, hint: "older man" },
  { quote: "I appreciate their preventive maintenance plan. It gives me peace of mind knowing my plumbing is in good hands.", name: "Jessica B.", location: "Flowing Wells", rating: 5, hint: "woman glasses" },
];

export default function TestimonialsPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Client Testimonials</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Hear from our satisfied customers across the region.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allTestimonials.map((testimonial, index) => (
          <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex-grow flex flex-col">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}
              </div>
              <blockquote className="text-foreground/80 mb-4 flex-grow">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              <div className="flex items-center gap-4 mt-auto border-t pt-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/100x100.png`} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
