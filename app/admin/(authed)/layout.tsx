import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Panel | NOVARA',
  robots: { index: false, follow: false },
};

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-pearl-warm">
      <AdminSidebar userEmail={user.email || ''} />
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
}
