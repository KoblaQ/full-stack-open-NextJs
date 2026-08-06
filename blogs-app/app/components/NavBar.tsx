'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { useNotification } from '../components/NotificationContext'

export default function NavBar() {
  const { data: session } = useSession()
  const { showNotification } = useNotification()

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    showNotification('Logged out successfully')
    signOut()
  }

  return (
    <nav>
      <Link href={'/'}>home</Link>
      {' | '}
      <Link href={'/blogs'}>blogs</Link>
      {' | '}
      <Link href={'/users'}>users</Link>
      {' | '}
      {session ? (
        <>
          <Link href={'/blogs/new'}>Add blog</Link>
          {' | '}
          <em>{session.user?.name} logged in</em>{' '}
          <button onClick={handleLogout}>logout</button>
          {/* <button onClick={() => signOut()}>logout</button> */}
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {' | '}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  )
}
