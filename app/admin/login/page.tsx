'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Wrong email or password.')
      setLoading(false)
    } else {
      // Hard redirect so the new auth cookie is picked up by middleware
      window.location.href = '/admin'
    }
  }

  const inputStyle = {
    background: 'var(--divider)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  } as React.CSSProperties

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="mb-8">
          <div className="text-[18px] font-semibold mb-1">
            <span style={{ color: 'var(--text)' }}>Tom</span>
            <span style={{ color: 'var(--accent)' }}>.PNG</span>
          </div>
          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
            Sign in to your admin panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>

          {error && (
            <p className="text-[12px]" style={{ color: '#b44040' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-2.5 rounded-lg text-[14px] font-medium transition-opacity hover:opacity-80 disabled:opacity-50 mt-1"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
