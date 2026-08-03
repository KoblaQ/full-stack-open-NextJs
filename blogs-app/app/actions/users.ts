'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const registerUser = async (
  prevState: {
    errors: {
      username?: string
      password?: string
      passwordConfirm?: string
      userExists?: string
    }
    values?: { username?: string; password?: string; name?: string }
  },
  formData: FormData,
) => {
  const errors: {
    username?: string
    password?: string
    passwordConfirm?: string
    userExists?: string
  } = {}

  const username = (formData.get('username') as string)?.trim()
  if (!username || username.length <= 4) {
    errors.username = 'Username must be at least 4 characters long'
  }
  const name = (formData.get('name') as string)?.trim()

  const password = formData.get('password') as string
  if (!password || password.length <= 4) {
    errors.password = 'Password must be at least 4 characters long'
  }

  const passwordConfirm = formData.get('passwordConfirm') as string
  if (passwordConfirm !== password) {
    errors.passwordConfirm = 'Passwords do not match'
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const userExists = await db.query.users.findFirst({
    where: eq(users.username, username),
  })
  if (userExists) {
    errors.userExists = `Username: ${username} already exists. Choose another one`
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password } }
  }

  await db.insert(users).values({ username, name, passwordHash })

  redirect('/login')
}
