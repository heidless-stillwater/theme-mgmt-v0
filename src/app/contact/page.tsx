import { ContactForm } from '@/components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

const contact = {
  address: '123 Plumber Lane, Pipe Creek, PC 12345',
  phone: '(123) 456-7890',
  email: 'contact@plumbingco.com',
};

const addressLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

export default function ContactPage() {
  return (
    <div className="bg-muted">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Get In Touch</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
            We're here to help! Whether you have a question or need to schedule a service, reach out to us.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Send us a Message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <a href={addressLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                        <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0">
                          <MapPin className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">Address</h3>
                            <p className="text-muted-foreground">{contact.address}</p>
                        </div>
                    </a>
                     <a href={`tel:${contact.phone}`} className="flex items-start gap-4 group">
                         <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0">
                            <Phone className="h-6 w-6"/>
                         </div>
                        <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">Phone</h3>
                            <p className="text-muted-foreground">{contact.phone}</p>
                        </div>
                    </a>
                     <a href={`mailto:${contact.email}`} className="flex items-start gap-4 group">
                        <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0">
                            <Mail className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">Email</h3>
                            <p className="text-muted-foreground">{contact.email}</p>
                        </div>
                    </a>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-1">
                    <p><span className="font-semibold text-foreground">Monday - Friday:</span> 8:00 AM - 5:00 PM</p>
                    <p><span className="font-semibold text-foreground">Saturday:</span> 9:00 AM - 1:00 PM</p>
                    <p><span className="font-semibold text-foreground">Sunday:</span> Closed</p>
                    <p className="!mt-3 text-sm text-primary font-semibold">24/7 Emergency Services Available</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
