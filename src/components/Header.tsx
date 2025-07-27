'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wrench, Palette, Sun, Moon, Activity, Brain, Fish } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { saveThemesToFile, loadThemesFromFile } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { ThemeListModal } from '@/components/ThemeListModal';
import { useTheme } from 'next-themes';
import { ColorfulThemeIcon } from '@/components/icons/ColorfulThemeIcon';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import JSZip from 'jszip';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

const themes = [
    { name: "default", primary: "hsl(231 48% 48%)", accent: "hsl(36 100% 62%)" },
    { name: "red", primary: "hsl(0 72% 51%)", accent: "hsl(0 86% 91%)" },
    { name: "orange", primary: "hsl(25 95% 53%)", accent: "hsl(25 97% 88%)" },
    { name: "amber", primary: "hsl(38 92% 50%)", accent: "hsl(45 93% 85%)" },
    { name: "yellow", primary: "hsl(48 96% 50%)", accent: "hsl(54 96% 85%)" },
    { name: "lime", primary: "hsl(84 79% 45%)", accent: "hsl(90 80% 88%)" },
    { name: "green", primary: "hsl(142 76% 36%)", accent: "hsl(142 60% 88%)" },
    { name: "emerald", primary: "hsl(158 79% 42%)", accent: "hsl(158 65% 88%)" },
    { name: "teal", primary: "hsl(172 80% 38%)", accent: "hsl(172 70% 88%)" },
    { name: "cyan", primary: "hsl(190 95% 45%)", accent: "hsl(190 85% 90%)" },
    { name: "sky", primary: "hsl(204 94% 48%)", accent: "hsl(204 90% 90%)" },
    { name: "blue", primary: "hsl(217 91% 60%)", accent: "hsl(217 95% 92%)" },
    { name: "indigo", primary: "hsl(240 82% 60%)", accent: "hsl(240 85% 92%)" },
    { name: "violet", primary: "hsl(262 88% 65%)", accent: "hsl(262 90% 92%)" },
    { name: "purple", primary: "hsl(271 91% 65%)", accent: "hsl(271 94% 92%)" },
    { name: "fuchsia", primary: "hsl(291 84% 60%)", accent: "hsl(291 88% 92%)" },
    { name: "pink", primary: "hsl(322 84% 60%)", accent: "hsl(322 88% 92%)" },
    { name: "rose", primary: "hsl(340 82% 60%)", accent: "hsl(340 86% 92%)" }
];


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleColorThemeChange = (colorTheme: string) => {
    const root = document.documentElement;
    themes.forEach(t => {
      if (t.name !== 'default') {
        root.classList.remove(t.name);
      }
    });
    if (colorTheme !== 'default') {
      root.classList.add(colorTheme);
    }
  };

  const handleSaveThemes = async () => {
    const result = await saveThemesToFile();
    if (result.success && result.files) {
      const zip = new JSZip();
      result.files.forEach(file => {
        zip.file(file.name, file.content);
      });
      
      zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }).then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'theme-config.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: 'Success',
          description: 'Theme configuration saved to theme-config.zip.',
        });
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
            // Force a reload to apply the new CSS file content
            window.location.reload();
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Palette className="h-5 w-5" />
                  <span className="sr-only">Theme Management</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-between px-2 py-1.5">
                    <Label htmlFor="dark-mode" className="flex items-center gap-2 text-sm font-normal cursor-pointer">
                        {resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        <span>Dark Mode</span>
                    </Label>
                    <Switch
                        id="dark-mode"
                        checked={resolvedTheme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <span>Color Themes</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        {themes.map((themeItem) => (
                            <DropdownMenuItem key={themeItem.name} onClick={() => handleColorThemeChange(themeItem.name)} className="capitalize">
                                <ColorfulThemeIcon primary={themeItem.primary} accent={themeItem.accent} className="mr-2" />
                                {themeItem.name === 'default' ? 'Default' : themeItem.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsThemeModalOpen(true)}>
                  <Activity className="mr-2 h-4 w-4" />
                  <span>List Themes</span>
                </DropdownMenuItem>
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
