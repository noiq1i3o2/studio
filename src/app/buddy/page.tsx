import { Header } from '@/components/Header';
import { ChatInterface } from '@/components/ChatInterface';

export default function BuddyPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Deen Buddy" />
      <ChatInterface />
    </div>
  );
}
