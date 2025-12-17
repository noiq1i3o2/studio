'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, BookOpen, PlayCircle, PauseCircle } from 'lucide-react';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio: string;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
  edition: {
    identifier: string;
  }
}

export default function SurahDetailPage({ params }: { params: { surahNumber: string } }) {
  const surahNumber = params.surahNumber;
  const [surah, setSurah] = useState<Surah | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurah() {
      if (!surahNumber) return;
      try {
        setLoading(true);
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ar.alafasy`);
        if (!response.ok) {
          throw new Error('Failed to fetch Surah details.');
        }
        const data = await response.json();
        const textData = data.data[0];
        const audioData = data.data[1];

        const combinedSurah: Surah = {
          ...textData,
          ayahs: textData.ayahs.map((ayah: Ayah, index: number) => ({
            ...ayah,
            audio: audioData.ayahs[index].audio,
          })),
        };
        
        setSurah(combinedSurah);

        if (audioData.ayahs.length > 0) {
            const surahAudioUrl = `https://server8.mp3quran.net/afs/${String(surahNumber).padStart(3, '0')}.mp3`;
            const audioInstance = new Audio(surahAudioUrl);
            audioInstance.onended = () => setIsPlaying(false);
            setAudio(audioInstance);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchSurah();

     return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [surahNumber]);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div>
        <Header title="Loading Surah..." />
        <main className="p-4 sm:p-6 space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-32" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header title="Error" />
        <main className="p-4 sm:p-6">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        </main>
      </div>
    );
  }

  if (!surah) {
    return null;
  }

  return (
    <div>
      <Header title={surah.englishName} />
      <main className="p-4 sm:p-6">
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="font-headline text-3xl text-primary">{surah.name}</CardTitle>
                <p className="text-muted-foreground">{surah.englishNameTranslation}</p>
              </div>
              {audio && (
                <button onClick={togglePlay} className="text-accent transition-transform hover:scale-110">
                    {isPlaying ? <PauseCircle className="h-12 w-12" /> : <PlayCircle className="h-12 w-12" />}
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p>{surah.numberOfAyahs} Ayahs</p>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <BookOpen className="h-6 w-6" />
                    Ayahs (Verses)
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            {surah.ayahs.map((ayah) => (
              <div key={ayah.number} className="border-b pb-4 last:border-b-0">
                <p dir="rtl" className="text-3xl font-arabic leading-relaxed text-right text-foreground">
                  {ayah.text}
                  <span className="text-sm font-sans text-accent p-2">{ayah.numberInSurah}</span>
                </p>
              </div>
            ))}
            </CardContent>
        </Card>
      </main>
    </div>
  );
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
