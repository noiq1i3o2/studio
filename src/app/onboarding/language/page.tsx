'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const languages = [
  { id: 'en', name: 'English' },
  { id: 'ar', name: 'العربية (Arabic)' },
  { id: 'ur', name: 'اردو (Urdu)' },
  { id: 'fr', name: 'Français (French)' },
];

export default function LanguagePage() {
  const router = useRouter();

  const handleLanguageSelect = (language: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('deen-journey-language', language);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/home');
  };

  return (
    <form onSubmit={handleSubmit}>
        <Card className="shadow-xl">
        <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl text-primary">Language Selection</CardTitle>
            <CardDescription>Choose the language for your Deen Buddy AI assistant.</CardDescription>
        </CardHeader>
        <CardContent>
            <RadioGroup defaultValue="en" onValueChange={handleLanguageSelect}>
            {languages.map((lang) => (
                <div key={lang.id} className="flex items-center space-x-3 space-y-2 rounded-md border p-4 hover:bg-accent/10 transition-colors">
                    <RadioGroupItem value={lang.id} id={lang.id} />
                    <Label htmlFor={lang.id} className="text-lg cursor-pointer">{lang.name}</Label>
                </div>
            ))}
            </RadioGroup>
        </CardContent>
        <CardFooter>
            <Button type="submit" className="w-full text-lg font-bold" size="lg">
            Complete Setup
            </Button>
        </CardFooter>
        </Card>
    </form>
  );
}
