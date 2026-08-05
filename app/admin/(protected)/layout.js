'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { supabase } from '@/lib/supabaseClient';

export default function ProtectedAdminLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push('/admin/login');
      } else {
        setChecked(true);
      }
    }
    checkSession();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (!checked) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-ink-900/50">Checking access...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-stone-200 bg-cream-0">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg text-ink-900">Admin</span>
            <Link href="/admin/products" className="text-sm text-ink-900 hover:text-juniper-700">
              Products
            </Link>
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm text-ink-900/60 hover:text-clay-600"
          >
            Sign out
          </button>
        </Container>
      </div>
      {children}
    </div>
  );
}