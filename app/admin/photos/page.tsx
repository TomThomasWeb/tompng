'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { savePhotoRecord, deletePhoto, updatePhotoMeta } from '@/lib/actions'

// This page is a client component because photo upload requires
// direct Supabase Storage calls from the browser

export default function PhotosAdmin() {
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // Load photos on mount
  useState(() => {
    supabase.from('photos').select('*').order('display_order').then(({ data }) => {
      if (data) setPhotos(data)
    })
  })

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('photos').upload(path, file)
    if (error) { alert('Upload failed: ' + error.message); setUploading(false); return }
    const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(path)
    await savePhotoRecord(publicUrl, caption, location, photos.length)
    const { data } = await supabase.from('photos').select('*').order('display_order')
    if (data) setPhotos(data)
    setCaption('')
    setLocation('')
    if (fileRef.current) fileRef.current.value = ''
    setUploading(false)
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm('Delete this photo?')) return
    await deletePhoto(id, url)
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  const inputStyle = {
    background: 'var(--divider)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '13px',
    width: '100%',
    outline: 'none',
  } as React.CSSProperties

  return (
    <div style={{ color: 'var(--text)' }}>
      <h1 className="text-[22px] font-semibold mb-6">Photography</h1>

      {/* Upload */}
      <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-[11px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>Upload photo</p>
        <div className="flex flex-col gap-3">
          <input ref={fileRef} type="file" accept="image/*" style={{ color: 'var(--text-muted)', fontSize: '13px' }} />
          <input style={inputStyle} placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
          <input style={inputStyle} placeholder="Location (e.g. Macclesfield Forest)" value={location} onChange={(e) => setLocation(e.target.value)} />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-80 disabled:opacity-50 self-start"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt={photo.caption} className="w-full aspect-square object-cover" />
            <div className="p-3" style={{ background: 'var(--surface)' }}>
              <p className="text-[11px] truncate mb-0.5" style={{ color: 'var(--text)' }}>{photo.caption || 'No caption'}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>{photo.location || 'No location'}</p>
              <button
                onClick={() => handleDelete(photo.id, photo.url)}
                className="mt-2 text-[11px] px-2 py-1 rounded transition-opacity hover:opacity-80"
                style={{ background: 'rgba(180,60,60,0.12)', color: '#b44040' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <p className="text-[13px] col-span-3" style={{ color: 'var(--text-subtle)' }}>
            No photos uploaded yet.
          </p>
        )}
      </div>
    </div>
  )
}
