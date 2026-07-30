'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addLike } from '../services/blogs'

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  if (!title || title.length <= 5) {
    return { error: 'Blog title must be at least 5 characters long' }
  }

  const author = formData.get('author') as string
  if (!author || author.length <= 5) {
    return { error: 'Blog author must be at least 5 characters long' }
  }

  const url = formData.get('url') as string
  if (!url || url.length <= 5) {
    return { error: 'Blog url must be at least 5 characters long' }
  }

  await addBlog(title, author, url)

  revalidatePath('/blogs')
  redirect('/blogs')
}

export const addBlogLike = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await addLike(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}
