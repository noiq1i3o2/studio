
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteAccountButton } from './_components/DeleteAccountButton';

export default function SettingsPage() {
  return (
    <div>
      <Header title="Account Settings" />
      <main className="p-4 sm:p-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              These actions are permanent and cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Delete Your Account</p>
              <p className="text-sm text-muted-foreground">This will permanently delete your account and all associated data.</p>
            </div>
            <DeleteAccountButton />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
