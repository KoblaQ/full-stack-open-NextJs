'use client'
import { useActionState, useEffect } from 'react'

import { registerUser } from '../actions/users'

import { useNotification } from '../components/NotificationContext'
import { useRouter } from 'next/navigation'

const initialState: {
  errors: {
    username?: string
    password?: string
    passwordConfirm?: string
    userExists?: string
  }
  values?: { username?: string; password?: string; name?: string }
  success: boolean
  error: string
} = {
  errors: {},
  values: {},
  success: false,
  error: '',
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification('note created')
      router.push('/notes')
    } else if (!state.success) {
      showNotification(state.error, 'error')
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors?.username && (
            <p style={{ color: 'red' }}>{state.errors.username}</p>
          )}
          {state.errors?.userExists && (
            <p style={{ color: 'red' }}>{state.errors.userExists}</p>
          )}
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors?.password && (
            <p style={{ color: 'red' }}>{state.errors?.password}</p>
          )}
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required />
          </label>
          {state.errors?.passwordConfirm && (
            <p style={{ color: 'red' }}>{state.errors?.passwordConfirm}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
