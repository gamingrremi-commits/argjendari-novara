'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Email ose password i pasaktë');
      setLoading(false);
      return;
    }

    toast.success('Mirë se erdhët!');
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-pearl">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center font-display text-3xl tracking-[0.4em] text-ink-black no-underline mb-2"
        >
          NOVARA
        </Link>
        <p className="text-center text-[10px] tracking-widest uppercase text-gold-dark mb-12">
          Admin Panel
        </p>

        <div className="bg-white border border-line p-8 md:p-10">
          <h1 className="font-display text-3xl text-ink-black mb-2">Hyr</h1>
          <p className="font-serif italic text-base text-ink mb-8">
            Hyni në panelin e administrimit.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full py-3.5 px-0 border-0 border-b border-line bg-transparent font-serif text-lg text-ink-black outline-none focus:border-gold transition-colors"
                placeholder="email@argjendarinovara.al"
              />
            </div>

            <div className="mb-8">
              <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3.5 px-0 border-0 border-b border-line bg-transparent font-serif text-lg text-ink-black outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[18px] bg-ink-black text-pearl border-none text-[11px] tracking-widest uppercase font-medium cursor-pointer transition-all duration-500 ease-luxe relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-luxe group-hover:translate-y-0 group-disabled:translate-y-full" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-ink-black">
                {loading ? 'Duke u futur...' : 'Hyr'}
              </span>
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="block text-center mt-8 text-[10px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors no-underline"
        >
          ← Kthehu te website
        </Link>
      </div>
    </div>
  );
}
