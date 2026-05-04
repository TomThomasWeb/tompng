import { createSupabaseServerClient } from '@/lib/supabase-server'
import { SectionCard, FormField, SelectField, SaveButton } from '@/components/admin/FormFields'
import { siteData } from '@/lib/data'
import { revalidatePath } from 'next/cache'

async function saveBook(formData: FormData) {
  'use server'
  const { createSupabaseServerClient: create } = await import('@/lib/supabase-server')
  const { revalidatePath } = await import('next/cache')
  const sb = await create()
  const id = formData.get('id') as string
  const payload = { title: formData.get('title') as string, author: formData.get('author') as string, status: formData.get('status') as string, display_order: Number(formData.get('order') ?? 0) }
  if (id) { await sb.from('books').update(payload).eq('id', id) }
  else { await sb.from('books').insert(payload) }
  revalidatePath('/')
}

async function deleteBook(id: string) {
  'use server'
  const { createSupabaseServerClient: create } = await import('@/lib/supabase-server')
  const { revalidatePath } = await import('next/cache')
  const sb = await create()
  await sb.from('books').delete().eq('id', id)
  revalidatePath('/')
}

const STATUS_OPTIONS = [
  { value: 'reading', label: 'Currently reading' },
  { value: 'want', label: 'Want to read' },
  { value: 'done', label: 'Done' },
]

export default async function ReadingAdmin() {
  const sb = await createSupabaseServerClient()
  const { data } = await sb.from('books').select('*').order('display_order')
  const books = data?.length ? data : siteData.books

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-6" style={{ color: 'var(--text)' }}>Reading list</h1>
      <div className="flex flex-col gap-4">
        {books.map((book: typeof books[0], i: number) => (
          <SectionCard key={book.id} title={book.title}>
            <form action={saveBook} className="flex flex-col gap-3">
              <input type="hidden" name="id" value={book.id} />
              <input type="hidden" name="order" value={i} />
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Title" name="title" defaultValue={book.title} />
                <FormField label="Author" name="author" defaultValue={book.author} />
              </div>
              <SelectField label="Status" name="status" defaultValue={book.status} options={STATUS_OPTIONS} />
              <div className="flex gap-3">
                <SaveButton label="Update" />
                <form action={deleteBook.bind(null, book.id)}>
                  <button type="submit" className="text-[12px] px-3 py-1.5 rounded-lg" style={{ background: 'rgba(180,60,60,0.12)', color: '#b44040', border: '1px solid rgba(180,60,60,0.2)' }}>Remove</button>
                </form>
              </div>
            </form>
          </SectionCard>
        ))}
        <SectionCard title="Add book">
          <form action={saveBook} className="flex flex-col gap-3">
            <input type="hidden" name="id" value="" />
            <input type="hidden" name="order" value={books.length} />
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Title" name="title" placeholder="Book title" />
              <FormField label="Author" name="author" placeholder="Author name" />
            </div>
            <SelectField label="Status" name="status" defaultValue="want" options={STATUS_OPTIONS} />
            <div><SaveButton label="Add book" /></div>
          </form>
        </SectionCard>
      </div>
    </div>
  )
}
