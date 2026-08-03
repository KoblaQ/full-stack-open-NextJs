'use client'

import { useActionState } from 'react'
import { createBlog } from '../../actions/blogs'

const initialState: {
  errors: { title?: string; author?: string; url?: string }
  values: { title?: string; author?: string; url?: string }
} = {
  errors: {},
  values: {},
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  return (
    <div>
      <h2>Create a new blog</h2>
      {/* <form action={createBlog}> */}
      <form action={formAction}>
        <div>
          <label>
            Title:{' '}
            <input
              type="text"
              name="title"
              required
              defaultValue={state.values?.title}
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
            />
          </label>
          {state.errors.url && (
            <p style={{ color: 'red' }}>{state.errors.url}</p>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
