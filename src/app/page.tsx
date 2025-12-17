
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CreditCard, Gift, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-md text-center">
        <header className="mb-8 flex flex-col items-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
            <Landmark className="h-16 w-16" />
          </div>
          <h1 className="font-headline text-5xl font-bold text-primary mb-2">
            Deen Journey
          </h1>
          <p className="font-headline text-2xl text-foreground/80">
            Your Deen Matters.
          </p>
        </header>

        <section className="mb-10">
          <p className="text-lg text-foreground/90">
            Start Your Journey to a deeper understanding of Islam. Simple, accessible, and guided by faith.
          </p>
        </section>

        <Card className="mb-10 bg-card/50 border-accent/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-accent">
              <Gift className="h-6 w-6" />
              <span>Free For Life</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <CreditCard className="h-5 w-5" /> No Registration or Credit Card Required.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="font-bold text-lg shadow-md transition-transform hover:scale-105">
            <Link href="/onboarding/age">Begin My Journey!</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bold text-lg shadow-sm transition-transform hover:scale-105">
            <Link href="#learn-more">
              <BookOpen className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </Button>
        </div>
      </div>
      
      <section id="learn-more" className="mt-20 w-full max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold text-primary mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg">
                  <h3 className="font-headline text-xl font-bold mb-2">Salah Guide</h3>
                  <p className="text-muted-foreground">Step-by-step visual tutorials for Wudu and prayer.</p>
              </div>
              <div className="p-4 rounded-lg">
                  <h3 className="font-headline text-xl font-bold mb-2">Surah Library</h3>
                  <p className="text-muted-foreground">Explore Quranic chapters, categorized for easy learning.</p>
              </div>
              <div className="p-4 rounded-lg">
                  <h3 className="font-headline text-xl font-bold mb-2">Deen Buddy AI</h3>
                  <p className="text-muted-foreground">Your personal AI assistant for Islamic questions.</p>
              </div>
          </div>
      </section>
    </main>
  );
}
