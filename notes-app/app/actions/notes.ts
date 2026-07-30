'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addNote, toggleImportance } from '../services/notes'

export const createNote = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const content = formData.get('content') as string
  if (!content || content.length < 10) {
    // throw new Error('Note content must be at least 10 characters long')
    return { error: 'Note content must be at least 10 characters long' }
  }
  const important = formData.get('important') === 'on'
  await addNote(content, important)

  revalidatePath('/notes')
  redirect('/notes')
}

export const toggleNoteImportance = async (formData: FormData) => {
  const id = Number(formData.get('id'))

  await toggleImportance(id)

  // needed to keep all the views in sync
  revalidatePath(`/notes/${id}`)
  revalidatePath('/notes')
}
