'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabaseClient';

export default function DeleteProductButton({ productId, productName }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${productName}"? This can't be undone.`
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const response = await fetch(`/api/adminproducts/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setDeleting(false);

      if (!response.ok) {
        console.error(result);
        alert(result.error || 'Failed to delete product.');
        return;
      }

      router.refresh();
    } catch (error) {
      setDeleting(false);
      console.error(error);
      alert('Something went wrong.');
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      aria-label="Delete product"
      className="text-ink-900/40 hover:text-clay-600 disabled:opacity-50"
    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
}