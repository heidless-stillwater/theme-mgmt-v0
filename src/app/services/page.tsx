import { CheckCircle, Wrench, Droplet } from 'lucide-react';
import { PipeIcon } from '@/components/icons/PipeIcon';
import Image from 'next/image';

const detailedServices = [
  {
    title: 'Emergency & General Repairs',
    icon: Wrench,
    image: 'https://placehold.co/600x400.png',
    hint: 'leaky pipe',
    description: "From sudden pipe bursts to persistent drips, our repair team is on standby 24/7. We diagnose issues accurately and provide lasting solutions to protect your home.",
    points: [
      "Leak detection and repair",
      "Clogged drain and sewer cleaning",
      "Water heater repair",
      "Toilet, shower, and faucet repairs",
    ],
  },
  {
    title: 'Fixture & Appliance Installation',
    icon: PipeIcon,
    image: 'https://placehold.co/600x400.png',
    hint: 'modern bathroom',
    description: "Upgrade your home with our professional installation services. We ensure all new fixtures and appliances are installed to code, function perfectly, and look great.",
    points: [
      "Full bathroom and kitchen remodels",
      "Installation of toilets, sinks, and showers",
      "Water heater and softener installation",
      "Sump pump and garbage disposal fitting",
    ],
  },
  {
    title: 'Preventive Maintenance',
    icon: Droplet,
    image: 'https://placehold.co/600x400.png',
    hint: 'plumber inspection',
    description: "An ounce of prevention is worth a pound of cure. Our maintenance services help you avoid unexpected plumbing disasters and save money in the long run.",
    points: [
      "Annual plumbing system inspections",
      "Drain cleaning and hydro-jetting",
      "Water heater flushing and maintenance",
      "Pipe insulation and winterization",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Plumbing Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Comprehensive solutions for a healthy home plumbing system.
        </p>
      </div>

      <div className="space-y-24">
        {detailedServices.map((service, index) => (
          <div key={service.title} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense md:[&>*:first-child]:col-start-2' : ''}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-3 w-fit">
                  <service.icon className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold font-headline">{service.title}</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 pt-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`md:row-start-1 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
              <Image 
                src={service.image}
                alt={service.title}
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint={service.hint}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
