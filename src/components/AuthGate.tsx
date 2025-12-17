'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';

const unauthenticatedPaths = ['/', '/login', '/verify-email'];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(getFirestore(), `users/${user.uid}`);
  }, [user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  useEffect(() => {
    const isAuthPath = unauthenticatedPaths.includes(pathname);
    const isOnboardingPath = pathname.startsWith('/onboarding');
    
    if (isUserLoading || isProfileLoading) {
      return; // Wait until user and profile data are loaded
    }
    
    if (!user && !isAuthPath) {
        // Not logged in and not on a public page, redirect to login
        router.replace('/login');
    } else if (user) {
        if (!user.emailVerified && !isOnboardingPath && pathname !== '/verify-email') {
            // Logged in but email not verified, and not on a path that's allowed
            router.replace('/verify-email');
        } else if(user.emailVerified) {
             if (userProfile && !userProfile.age && !isOnboardingPath) {
                // Profile exists but is incomplete, redirect to onboarding
                router.replace('/onboarding/age');
            } else if (isAuthPath) {
                // Logged in and on a public page, redirect to home
                router.replace('/home');
            }
        }
    }
  }, [user, userProfile, isUserLoading, isProfileLoading, pathname, router]);


  if (isUserLoading || (!unauthenticatedPaths.includes(pathname) && (!user || isProfileLoading))) {
      return (
          <div className="flex min-h-screen items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
      );
  }

  return <>{children}</>;
}
