import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const surahs = [
  { no: 1, name: 'Al-Fatiha', meaning: 'The Opening', difficulty: 'Easy' },
  { no: 112, name: 'Al-Ikhlas', meaning: 'The Sincerity', difficulty: 'Easy' },
  { no: 113, name: 'Al-Falaq', meaning: 'The Daybreak', difficulty: 'Easy' },
  { no: 114, name: 'An-Nas', meaning: 'The Mankind', difficulty: 'Easy' },
  { no: 18, name: 'Al-Kahf', meaning: 'The Cave', difficulty: 'Medium' },
  { no: 36, name: 'Ya-Sin', meaning: 'Ya Sin', difficulty: 'Medium' },
  { no: 55, name: 'Ar-Rahman', meaning: 'The Most Merciful', difficulty: 'Medium' },
  { no: 67, name: 'Al-Mulk', meaning: 'The Sovereignty', difficulty: 'Medium' },
  { no: 2, name: 'Al-Baqarah', meaning: 'The Cow', difficulty: 'Hard' },
  { no: 3, name: 'Aal-E-Imran', meaning: 'The Family of Imran', difficulty: 'Hard' },
  { no: 4, name: 'An-Nisa', meaning: "The Women", difficulty: 'Hard' },
  { no: 5, name: 'Al-Maidah', meaning: "The Table Spread", difficulty: 'Hard' },
];

const difficulties = ['Easy', 'Medium', 'Hard'];

function SurahCard({ surah }: { surah: typeof surahs[0] }) {
  return (
    <Link href="#" legacyBehavior>
      <a className="block">
        <Card className="transform transition-transform hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-primary">{surah.no}. {surah.name}</CardTitle>
                <CardDescription>{surah.meaning}</CardDescription>
              </div>
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
          </CardHeader>
        </Card>
      </a>
    </Link>
  );
}

export default function SurahPage() {
  return (
    <div>
      <Header title="Surah Library" />
      <main className="p-4 sm:p-6">
        <Tabs defaultValue="Easy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            {difficulties.map((level) => (
              <TabsTrigger key={level} value={level} className="font-headline text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {level}
              </TabsTrigger>
            ))}
          </TabsList>
          {difficulties.map((level) => (
            <TabsContent key={level} value={level}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {surahs.filter(s => s.difficulty === level).map((surah) => (
                  <SurahCard key={surah.no} surah={surah} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
