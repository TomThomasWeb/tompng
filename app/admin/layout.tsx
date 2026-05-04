import { createSupabaseServerClient } from '@/lib/supabase-server'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata = { title: 'Admin — Tom.PNG' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // No user — render children as-is (middleware redirects protected
  // routes to /admin/login before they ever reach this layout)
  if (!user) {
    return <>{children}</>
  }

  // Authenticated — full admin shell with nav
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <AdminNav />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
