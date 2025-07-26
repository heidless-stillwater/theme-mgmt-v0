import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin } from 'lucide-react';

const contact = {
  address: '123 Plumber Lane, Pipe Creek, PC 12345',
  phone: '(123) 456-7890',
  email: 'contact@plumbingco.com',
};

const addressLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 flex flex-col items-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Wrench className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground font-headline">Plumbing Co.</span>
            </Link>
            <p className="text-sm">Your reliable plumbing experts.</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/testimonials" className="hover:text-primary">Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-2">
             <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0"/>
                <a href={addressLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{contact.address}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 shrink-0"/>
                <a href={`tel:${contact.phone}`} className="hover:text-primary">{contact.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 shrink-0"/>
                <a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Plumbing Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
