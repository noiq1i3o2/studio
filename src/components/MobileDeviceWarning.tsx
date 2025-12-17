'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from './ui/button';
import { Smartphone, X } from 'lucide-react';

export function MobileDeviceWarning() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const isDesktopDevice = window.innerWidth >= 768;
    setIsDesktop(isDesktopDevice);
    
    const hasDismissed = localStorage.getItem('dismissedMobileWarning');
    if (isDesktopDevice && !hasDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('dismissedMobileWarning', 'true');
    setIsVisible(false);
  };

  if (!isVisible || !isDesktop) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 p-4 animate-in fade-in slide-in-from-top">
      <Alert className="bg-background/80 backdrop-blur-md shadow-lg">
        <Smartphone className="h-4 w-4" />
        <AlertTitle>Better on Mobile!</AlertTitle>
        <AlertDescription>
          This app is designed for a mobile experience. The interface may not be optimal on desktop or tablet devices.
        </AlertDescription>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </Alert>
    </div>
  );
}
