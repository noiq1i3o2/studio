'use client';

import { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookOpen, PlayCircle, PauseCircle, Terminal, Info } from 'lucide-react';
import Link from 'next/link';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

const difficulties = {
  Easy: (ayahs: number) => ayahs <= 20,
  Medium: (ayahs: number) => ayahs > 20 && ayahs <= 80,
  Hard: (ayahs: number) => ayahs > 80,
};

function SurahCard({ surah, onPlay, isPlaying }: { surah: Surah, onPlay: (surahNumber: number) => void, isPlaying: boolean }) {
  return (
    <Card className="transform transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Link href={`/surah/${surah.number}`} className="group">
            <CardTitle className="font-headline text-primary group-hover:text-accent transition-colors">{surah.number}. {surah.englishName}</CardTitle>
            <p className="text-muted-foreground">{surah.englishNameTranslation}</p>
            <p className="text-sm text-muted-foreground mt-1">{surah.name}</p>
          </Link>
          <button onClick={() => onPlay(surah.number)} className="text-accent transition-transform hover:scale-110 flex-shrink-0 ml-4">
            {isPlaying ? <PauseCircle className="h-8 w-8" /> : <PlayCircle className="h-8 w-8" />}
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex items-end justify-between text-sm text-muted-foreground">
         <p>{surah.numberOfAyahs} Ayahs</p>
         <Link href={`/surah/${surah.number}`} className="group flex items-center gap-1 hover:text-accent">
            Read <Info className="h-4 w-4" />
         </Link>
      </CardContent>
    </Card>
  );
}

export default function SurahPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) {
          throw new Error('Failed to fetch Surahs.');
        }
        const data = await response.json();
        setSurahs(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    }
    fetchSurahs();
    
    return () => {
        if(audioRef.current){
            audioRef.current.pause();
        }
    }
  }, []);

  const handlePlay = (surahNumber: number) => {
    if (playingSurah === surahNumber) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingSurah(null);
    } else {
      // Play new surah
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(`https://server8.mp3quran.net/afs/${String(surahNumber).padStart(3, '0')}.mp3`);
      audioRef.current = audio;
      audio.play();
      setPlayingSurah(surahNumber);
      audio.onended = () => setPlayingSurah(null);
      audio.onerror = () => {
          setError(`Could not play audio for Surah ${surahNumber}.`);
          setPlayingSurah(null);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[...Array(9)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive" className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    return Object.entries(difficulties).map(([level, check]) => (
      <TabsContent key={level} value={level}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {surahs
            .filter(s => check(s.numberOfAyahs))
            .map((surah) => (
              <SurahCard 
                key={surah.number} 
                surah={surah} 
                onPlay={handlePlay}
                isPlaying={playingSurah === surah.number}
              />
            ))}
        </div>
      </TabsContent>
    ));
  };

  return (
    <div>
      <Header title="Surah Library" />
      <main className="p-4 sm:p-6">
        <Tabs defaultValue="Easy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            {Object.keys(difficulties).map((level) => (
              <TabsTrigger key={level} value={level} className="font-headline text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {level}
              </TabsTrigger>
            ))}
          </TabsList>
          {renderContent()}
        </Tabs>
      </main>
    </div>
  );
}
