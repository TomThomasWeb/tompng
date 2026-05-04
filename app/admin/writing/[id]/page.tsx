import { notFound, redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { savePost } from '@/lib/actions'
import { SectionCard, FormField, TextareaField, SaveButton } from '@/components/admin/FormFields'

async function updatePost(formData: FormData) {
  'use server'
  await savePost(formData)
  redirect('/admin/writing')
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sb = await createSupabaseServerClient()
  const { data: post } = await sb.from('posts').select('*').eq('id', id).single()
  if (!post) notFound()

  const dateStr = new Date(post.published_at).toISOString().split('T')[0]

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Edit post</h1>
      <form action={updatePost} className="flex flex-col gap-5">
        <input type="hidden" name="id" value={post.id} />
        <SectionCard title="Details">
          <div className="flex flex-col gap-4">
            <FormField label="Title"    name="title"    defaultValue={post.title} required />
            <FormField label="Subtitle" name="subtitle" defaultValue={post.subtitle} />
            <FormField label="Slug"     name="slug"     defaultValue={post.slug} required />
            <FormField label="Date"     name="published_at" type="date" defaultValue={dateStr} />
          </div>
        </SectionCard>
        <SectionCard title="Content">
          <TextareaField label="Body" name="body" defaultValue={post.body} rows={24} />
        </SectionCard>
        <div><SaveButton label="Save changes" /></div>
      </form>
    </div>
  )
}
