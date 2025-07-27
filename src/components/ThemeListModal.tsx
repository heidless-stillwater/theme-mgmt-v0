'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getThemes } from '@/lib/actions';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ThemeListModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ThemeListModal({ isOpen, onOpenChange }: ThemeListModalProps) {
  const [themes, setThemes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      getThemes()
        .then((result) => {
          if (result.success && result.themes) {
            setThemes(result.themes);
          } else {
            setError(result.message || 'An unknown error occurred.');
          }
        })
        .catch(() => {
          setError('Failed to fetch themes from the server.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Available Themes</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          ): (
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Badge key={theme} variant="secondary" className="text-lg">
                  {theme}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" style={{fontSize: '17px'}}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
