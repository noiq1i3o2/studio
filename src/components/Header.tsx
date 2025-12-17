
'use client';

import { ArrowLeft, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from './ui/avatar';
import Link from 'next/link';


type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const router = useRouter();
  const auth = useAuth();
  const { user } = useUser();

  const handleSignOut = () => {
    signOut(auth);
    router.push('/');
  }

  const getInitials = (email: string | null | undefined) => {
    return email ? email.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />;
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="font-headline text-xl font-semibold text-primary">{title}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Avatar className='h-8 w-8'>
              <AvatarFallback className='bg-primary text-primary-foreground'>
                {getInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
