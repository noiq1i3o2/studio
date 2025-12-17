import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hand, BookOpen, Heart, Users, Moon } from 'lucide-react';

const improvementTopics = [
  {
    title: 'Consistency in Prayer',
    description: 'Tips to maintain all five daily prayers on time and with concentration (Khushu).',
    icon: <Hand className="h-8 w-8 text-accent" />,
  },
  {
    title: 'Daily Quran Reading',
    description: 'The importance of connecting with the Quran daily, even if it\'s just a few verses.',
    icon: <BookOpen className="h-8 w-8 text-accent" />,
  },
  {
    title: 'Dhikr & Remembrance',
    description: 'Simple phrases of remembrance (Dhikr) to keep your tongue moist with the praise of Allah.',
    icon: <Heart className="h-8 w-8 text-accent" />,
  },
  {
    title: 'Good Character',
    description: 'Following the example of the Prophet (PBUH) in dealings with family, friends, and community.',
    icon: <Users className="h-8 w-8 text-accent" />,
  },
   {
    title: 'Seeking Knowledge',
    description: 'The virtue of seeking Islamic knowledge and practical ways to start your learning journey.',
    icon: <BookOpen className="h-8 w-8 text-accent" />,
  },
  {
    title: 'Night Prayers (Tahajjud)',
    description: 'Experience the tranquility and reward of waking up for voluntary prayers in the last third of the night.',
    icon: <Moon className="h-8 w-8 text-accent" />,
  }
];

export default function DeenPage() {
  return (
    <div>
      <Header title="Improve Your Deen" />
      <main className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {improvementTopics.map((topic) => (
            <Card key={topic.title} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-headline text-xl font-bold text-primary">{topic.title}</CardTitle>
                {topic.icon}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
