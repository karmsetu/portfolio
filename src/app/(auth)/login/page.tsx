// app/login/page.tsx
'use client';

import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const signIn = () => {
    setIsPending(true);
    try {
      authClient.signIn.social({ provider: 'github' });
    } catch (error) {
      console.error(error);
      toast(' Error while signing in...');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login to Dashboard</h1>
        <button
          onClick={signIn}
          disabled={isPending}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? 'Redirecting...' : 'Continue with GitHub'}
        </button>
      </div>
    </div>
  );
}
