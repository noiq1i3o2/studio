
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      <h1 className="font-headline text-xl font-semibold text-primary">{title}</h1>
    </header>
  );
}
