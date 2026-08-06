'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/layout/Container';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    router.replace('/admin/products');
  }

  return (
    <Container className="py-24 max-w-sm">
      <h1 className="font-display text-2xl text-ink-900 mb-8">Admin login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <p className="rounded-md bg-clay-600/10 border border-clay-600/30 px-4 py-3 text-sm text-clay-600">
            {errorMessage}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-juniper-700 px-6 py-3 text-sm font-medium text-cream-0 hover:bg-juniper-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </Container>
  );
}