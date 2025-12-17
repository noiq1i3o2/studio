'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MailCheck } from 'lucide-react';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export default function VerifyEmailPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If user is verified, send them to onboarding or home
    if (user?.emailVerified) {
      router.replace('/onboarding/age');
    }
  }, [user, router]);

  const handleResend = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        toast({
          title: 'Verification Email Sent',
          description: 'A new verification link has been sent to your email address.',
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to send verification email. Please try again later.',
        });
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  }

  if (isUserLoading) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 font-headline text-3xl text-primary">
            Verify Your Email
          </CardTitle>
          <CardDescription>
            We've sent a verification link to <strong>{user?.email}</strong>. Please check your inbox and click the link to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
            <p>Once your email is verified, you can continue to the app. You may need to refresh this page after verification.</p>
             <p className="mt-4">Didn't receive an email? Check your spam folder or resend the link.</p>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button onClick={() => window.location.reload()} className="w-full">
            I've Verified My Email (Refresh)
          </Button>
          <div className="flex w-full gap-4">
             <Button onClick={handleResend} variant="secondary" className="w-full">
                Resend Link
             </Button>
            <Button onClick={handleSignOut} variant="outline" className="w-full">
                Sign Out
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
