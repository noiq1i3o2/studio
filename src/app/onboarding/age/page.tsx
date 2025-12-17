'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

export default function AgePage() {
  const [age, setAge] = useState('');
  const [showParentalGuidance, setShowParentalGuidance] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();


  const handleContinue = async () => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Age",
        description: "Please enter a valid age.",
      })
      return;
    }

    if (user && firestore) {
        const userRef = doc(firestore, `users/${user.uid}`);
        setDocumentNonBlocking(userRef, { age: ageNum }, { merge: true });
    }

    if (!isNaN(ageNum) && ageNum < 10) {
      setShowParentalGuidance(true);
    } else {
      router.push('/onboarding/language');
    }
  };

  const handleParentalGuidanceContinue = () => {
     router.push('/onboarding/language');
  }

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl text-primary">Welcome!</CardTitle>
        <CardDescription>Let's start your journey. Please enter your age to personalize your experience.</CardDescription>
      </CardHeader>
      <CardContent>
        {showParentalGuidance ? (
          <Alert className="border-accent bg-accent/10">
            <Shield className="h-4 w-4 text-accent" />
            <AlertTitle className="text-accent">Parental Guidance Recommended</AlertTitle>
            <AlertDescription>
              For our younger users, we recommend exploring Deen Journey with a parent or guardian.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="age" className="text-lg">Your Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 25"
              className="text-center text-xl h-12"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={showParentalGuidance ? handleParentalGuidanceContinue : handleContinue} className="w-full text-lg font-bold" size="lg">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
