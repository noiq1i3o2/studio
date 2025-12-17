import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Hand, Heart } from 'lucide-react';
import Link from 'next/link';
import { PrayerTimes } from '@/components/PrayerTimes';
import { DeenBuddyButton } from '@/components/DeenBuddyButton';

const topics = [
  {
    title: 'Salah Tutorial',
    description: 'Learn the steps of prayer with visual guides.',
    href: '/salah',
    icon: <Hand className="h-8 w-8 text-accent" />,
  },
  {
    title: 'Surah Library',
    description: 'Access and learn chapters from the Holy Quran.',
    href: '/surah',
    icon: <BookOpen className="h-8 w-8 text-accent" />,
  },
  {
    title: 'Improve Your Deen',
    description: 'Guidance on strengthening your faith and practice.',
    href: '/deen',
    icon: <Heart className="h-8 w-8 text-accent" />,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-primary p-6 text-primary-foreground shadow-md">
        <h1 className="font-headline text-3xl font-bold">Deen Journey Home</h1>
        <p className="mt-1 opacity-90">Your personal guide to Islamic learning.</p>
      </header>

      <main className="p-4 sm:p-6 space-y-6">
        <PrayerTimes />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link href={topic.href} key={topic.title} legacyBehavior>
              <a className="block">
                <Card className="h-full transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-headline text-2xl font-bold text-primary">{topic.title}</CardTitle>
                    {topic.icon}
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardContent>
                  <div className="flex justify-end p-4 pt-0">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <DeenBuddyButton />
    </div>
  );
}
