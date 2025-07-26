import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Droplet, Star } from 'lucide-react';
import { PipeIcon } from '@/components/icons/PipeIcon';

const services = [
  {
    icon: Wrench,
    title: 'Expert Repairs',
    description: 'Leaky pipes, clogged drains, or broken water heaters. We fix it all, quickly and efficiently.',
  },
  {
    icon: PipeIcon,
    title: 'New Installations',
    description: 'Upgrading your bathroom or kitchen? We provide professional installation for all plumbing fixtures.',
  },
  {
    icon: Droplet,
    title: 'Preventive Maintenance',
    description: 'Keep your plumbing system in top shape and avoid costly emergencies with our maintenance plans.',
  },
];

const testimonials = [
    {
        quote: "Plumbing Co. was a lifesaver! They arrived on time, fixed my leaky faucet in minutes, and were incredibly professional. Highly recommend!",
        name: "Sarah L.",
        location: "Pipe Creek"
    },
    {
        quote: "I had a major plumbing emergency and their team responded immediately, even after hours. Their quick work saved me from a disaster. Thank you!",
        name: "Mike R.",
        location: "Watertown"
    },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
            Reliable Plumbing, Done Right.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Your trusted local experts for all plumbing needs. From emergency repairs to new installations, we deliver quality service with a smile.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Core Services</h2>
            <p className="mt-2 text-lg text-muted-foreground">We offer a wide range of plumbing solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Snippet */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Clients Say</h2>
                <p className="mt-2 text-lg text-muted-foreground">We are proud of our excellent service.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index}>
                        <CardContent className="pt-6">
                            <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}
                            </div>
                            <p className="text-foreground/80 mb-4">"{testimonial.quote}"</p>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button asChild variant="link" className="text-primary">
                    <Link href="/testimonials">Read More Testimonials &rarr;</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            Ready to Solve Your Plumbing Problems?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-foreground/80">
            Don't let a small leak become a big issue. Contact us today for a fast, free, and friendly quote.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">Contact Us Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
