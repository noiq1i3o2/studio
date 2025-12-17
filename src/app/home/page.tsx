import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Hand, Heart } from 'lucide-react';
import Link from 'next/link';
import { PrayerTimes } from '@/components/PrayerTimes';
import { DeenBuddyButton } from '@/components/DeenBuddyButton';
import { MobileDeviceWarning } from '@/components/MobileDeviceWarning';

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
       <MobileDeviceWarning />
      <header className="bg-primary/80 backdrop-blur-sm p-6 text-primary-foreground shadow-md sticky top-0 z-10">
        <h1 className="font-headline text-3xl font-bold">Deen Journey Home</h1>
        <p className="mt-1 opacity-90">As-salamu alaykum! Your personal guide to Islamic learning awaits.</p>
      </header>

      <main className="p-4 sm:p-6 space-y-6">
        <PrayerTimes />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Link href={topic.href} key={topic.title} className="block group">
                <Card className="h-full bg-card/70 backdrop-blur-sm border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-card/90">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-headline text-2xl font-bold text-primary">{topic.title}</CardTitle>
                    {topic.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">{topic.description}</p>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </main>
      <DeenBuddyButton />
    </div>
  );
}
