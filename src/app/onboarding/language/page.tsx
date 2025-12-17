'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useUser, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const languages = [
  { id: 'en', name: 'English' },
  { id: 'ar', name: 'العربية (Arabic)' },
  { id: 'ur', name: 'اردو (Urdu)' },
  { id: 'fr', name: 'Français (French)' },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { user } = useUser();
  const firestore = useFirestore();


  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('deen-journey-language', language);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && firestore) {
        const userRef = doc(firestore, `users/${user.uid}`);
        setDocumentNonBlocking(userRef, { preferredLanguage: selectedLanguage }, { merge: true });
    }
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
            <RadioGroup defaultValue={selectedLanguage} onValueChange={handleLanguageSelect}>
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
