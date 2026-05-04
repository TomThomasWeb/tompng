import { redirect } from 'next/navigation'
import { savePost } from '@/lib/actions'
import { SectionCard, FormField, TextareaField, SaveButton } from '@/components/admin/FormFields'

async function createPost(formData: FormData) {
  'use server'
  await savePost(formData)
  redirect('/admin/writing')
}

export default function NewPostPage() {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>New post</h1>
      <form action={createPost} className="flex flex-col gap-5">
        <input type="hidden" name="id" value="" />
        <SectionCard title="Details">
          <div className="flex flex-col gap-4">
            <FormField label="Title"    name="title"    placeholder="Post title" required />
            <FormField label="Subtitle" name="subtitle" placeholder="A short description" />
            <FormField
              label="Slug"
              name="slug"
              placeholder="post-title-like-this"
              required
            />
            <FormField
              label="Date"
              name="published_at"
              type="date"
              defaultValue={today}
            />
          </div>
        </SectionCard>
        <SectionCard title="Content">
          <TextareaField
            label="Body"
            name="body"
            rows={20}
            placeholder="Write your post here... (plain text or Markdown)"
          />
        </SectionCard>
        <div><SaveButton label="Publish post" /></div>
      </form>
    </div>
  )
}
