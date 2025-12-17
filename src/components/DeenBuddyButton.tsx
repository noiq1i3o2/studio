'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

export function DeenBuddyButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in">
        <Button asChild size="lg" className="rounded-full shadow-2xl bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/buddy">
                <Sparkles className="mr-2 h-5 w-5" />
                Talk with Deen Buddy
            </Link>
        </Button>
    </div>
  );
}
