'use client'

import { useActionState, useEffect } from 'react'
import { createBlog } from '../../actions/blogs'

import { useNotification } from '../../components/NotificationContext'
import { useRouter } from 'next/navigation'

const initialState: {
  errors: { title?: string; author?: string; url?: string }
  values: { title?: string; author?: string; url?: string }
  error?: string
  success?: boolean
} = {
  errors: {},
  values: {},
  error: '',
  success: false,
}

const NewBlog = () => {
  // const [state, formAction] = useActionState(createBlog, initialState)
  const [state, formAction] = useActionState(createBlog, initialState)

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification('Blog created')
      router.push('/blogs')
    } else if (state.error) {
      showNotification(state.error, 'error')
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2x1 mx-auto p-6 space-y-4">
      <h2 className="text-2x1 font-bold mb-4">Create a new blog</h2>
      {/* <form action={createBlog}> */}
      <form action={formAction} className="space-y-4 border rounded p-4">
        <div>
          <label>
            Title:{' '}
            <input
              type="text"
              name="title"
              required
              defaultValue={state.values?.title}
              className="border rounded px-2 py-1 bg-gray-100 text-black"
            />
          </label>
          {state.errors?.title && (
            <p style={{ color: 'red' }}>{state.errors.title}</p>
          )}
        </div>
        <div>
          <label>
            Author:{' '}
            <input
              type="text"
              name="author"
              required
              defaultValue={state.values?.author}
              className="border rounded px-2 py-1 bg-gray-100 text-black"
            />
          </label>
          {state.errors?.author && (
            <p style={{ color: 'red' }}>{state.errors.author}</p>
          )}
        </div>
        <div>
          <label>
            url:{' '}
            <input
              type="text"
              id="url"
              name="url"
              required
              defaultValue={state.values?.url}
              className="border rounded px-2 py-1 bg-gray-100 text-black"
            />
          </label>
          {state.errors.url && (
            <p style={{ color: 'red' }}>{state.errors.url}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-green-500 text-white px-2 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
