'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wrench, Fingerprint, Brain, Fish, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { saveThemesToFile, loadThemesFromFile } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { ThemeListModal } from '@/components/ThemeListModal';
import { ThemeModeToggle } from './ThemeModeToggle';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveThemes = async () => {
    const result = await saveThemesToFile();
    if (result.success && result.content) {
      const blob = new Blob([result.content], { type: 'text/css;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = result.filename || 'themes.css';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: 'Success',
        description: 'Themes saved to file.',
      });
    } else {
      toast({
        title: 'Error',
        description: result.message || 'Could not save themes.',
        variant: 'destructive',
      });
    }
  };

  const handleLoadThemes = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const result = await loadThemesFromFile(content);
         if (result.success) {
            toast({
                title: 'Success!',
                description: result.message,
            });
        } else {
             toast({
                title: 'Error!',
                description: result.message,
                variant: 'destructive'
            });
        }
      };
      reader.readAsText(file);
    }
     // Reset file input
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">Plumbing Co.</span>
            </Link>
            <nav className="hidden gap-6 text-sm md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">Start Here</Link>
            </Button>
            
            <ThemeModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Fingerprint className="h-5 w-5" />
                  <span className="sr-only">Theme Management</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 <DropdownMenuItem onClick={() => setIsThemeModalOpen(true)}>
                  <Activity className="mr-2 h-4 w-4" />
                  <span>List Themes</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSaveThemes}>
                  <Brain className="mr-2 h-4 w-4" />
                  <span>Save Themes</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLoadThemes}>
                  <Fish className="mr-2 h-4 w-4" />
                  <span>Load Themes</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".css"
            />


            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center border-b pb-4">
                      <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                        <Wrench className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg font-headline">Plumbing Co.</span>
                      </Link>
                  </div>
                  <div className="flex flex-col gap-1 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "text-lg font-medium p-2 rounded-md",
                            pathname === link.href ? 'bg-muted text-foreground' : 'text-foreground/70 hover:bg-muted/50 hover:text-foreground'
                          )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <Button asChild className="mt-auto bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Start Here</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <ThemeListModal isOpen={isThemeModalOpen} onOpenChange={setIsThemeModalOpen} />
    </>
  );
}
