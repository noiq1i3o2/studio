'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Clock, Moon, Sun, Sunrise, Sunset, Terminal } from 'lucide-react';

type PrayerTimings = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

const prayerIcons = {
  Fajr: <Sunrise className="h-5 w-5 text-accent" />,
  Dhuhr: <Sun className="h-5 w-5 text-accent" />,
  Asr: <Sun className="h-5 w-5 text-accent opacity-70" />,
  Maghrib: <Sunset className="h-5 w-5 text-accent" />,
  Isha: <Moon className="h-5 w-5 text-accent" />,
};

export function PrayerTimes() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
          if (!response.ok) {
            throw new Error('Failed to fetch prayer times.');
          }
          const data = await response.json();
          const prayerTimings: PrayerTimings = data.data.timings;
          // Format time to 12-hour format
          Object.keys(prayerTimings).forEach(key => {
              const [hour, minute] = prayerTimings[key as keyof PrayerTimings].split(':');
              const h = parseInt(hour, 10);
              const ampm = h >= 12 ? 'PM' : 'AM';
              const formattedHour = h % 12 || 12;
              prayerTimings[key as keyof PrayerTimings] = `${formattedHour}:${minute} ${ampm}`;
          });

          setTimings(prayerTimings);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Today's Prayer Times</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-primary"><Clock className="h-6 w-6" /> Today's Prayer Times</CardTitle>
      </CardHeader>
      <CardContent>
        {timings && (
          <ul className="space-y-3">
            {Object.entries(timings).map(([name, time]) => (
              <li key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {prayerIcons[name as keyof typeof prayerIcons]}
                    <span className="font-semibold text-foreground/90">{name}</span>
                </div>
                <span className="font-mono text-lg text-primary">{time}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
