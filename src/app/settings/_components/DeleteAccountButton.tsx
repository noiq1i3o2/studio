
'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { deleteUser } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export function DeleteAccountButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user } = useUser();

  const handleDelete = async () => {
    setIsLoading(true);
    
    if (!user || !auth || !firestore) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not find user authentication context.",
        });
        setIsLoading(false);
        return;
    }

    try {
      // 1. Delete Firestore document
      const userDocRef = doc(firestore, `users/${user.uid}`);
      deleteDocumentNonBlocking(userDocRef);

      // 2. Delete the user from Firebase Auth
      // This will automatically sign them out.
      await deleteUser(user);

      toast({
        title: "Account Deleted",
        description: "Your account has been successfully and permanently deleted.",
      });

      // Redirect to home/login page after deletion
      router.push('/');
      router.refresh(); // Force a refresh to clear any lingering state

    } catch (error: any) {
      console.error("Account deletion error:", error);
      
      let errorMessage = "Could not delete your account. Please try again.";
      // Handle re-authentication if required
      if (error.code === 'auth/requires-recent-login') {
          errorMessage = "This is a sensitive operation. Please sign out and sign back in before deleting your account.";
      }
      
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: errorMessage,
      });
      setIsLoading(false);
    }
  };


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-destructive hover:bg-destructive/90">
            {isLoading ? 'Deleting...' : 'Yes, delete my account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
