import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wrench, Heart, Users } from 'lucide-react';

const teamMembers = [
  { name: 'John Plumber', role: 'Master Plumber & Founder', image: 'https://placehold.co/400x400.png', hint: 'man portrait' },
  { name: 'Jane Fitter', role: 'Installation Specialist', image: 'https://placehold.co/400x400.png', hint: 'woman portrait' },
  { name: 'Mike Drain', role: 'Repair Technician', image: 'https://placehold.co/400x400.png', hint: 'man smiling' },
  { name: 'Emily Pipe', role: 'Apprentice Plumber', image: 'https://placehold.co/400x400.png', hint: 'woman smiling' },
];

export default function AboutPage() {
  return (
    <>
      <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">About Plumbing Co.</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Your neighborhood's most trusted plumbing service for over 20 years.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">Our History</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Founded in 2003 by John Plumber, Plumbing Co. started as a one-man operation with a simple goal: to provide honest, reliable plumbing services to the local community. With a commitment to quality workmanship and customer satisfaction, our reputation grew, and so did our team.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Today, we are a full-service plumbing company, but our core values remain the same. We treat every home as if it were our own and every client like family.
            </p>
          </div>
          <div>
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Plumbing Co. van"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="plumbing van"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-24">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                        <Heart className="h-8 w-8" />
                    </div>
                    <CardTitle className="mt-4 font-headline">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">To provide exceptional plumbing services with integrity, ensuring the safety and comfort of our clients' homes.</p>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                     <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                        <Wrench className="h-8 w-8" />
                    </div>
                    <CardTitle className="mt-4 font-headline">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">To be the leading plumbing service provider in the region, known for our innovation, reliability, and customer-centric approach.</p>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                     <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                        <Users className="h-8 w-8" />
                    </div>
                    <CardTitle className="mt-4 font-headline">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Quality, Honesty, Punctuality, and Respect. These principles guide every job we undertake.</p>
                </CardContent>
            </Card>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold font-headline text-center mb-12">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4 border-2 border-primary/20">
                    <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
