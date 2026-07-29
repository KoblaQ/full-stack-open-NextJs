import AuthSessionProvider from './components/SessionProvider'
import NavBar from './components/NavBar'
// import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <nav>
          <Link href="/">home</Link>
          {' | '}
          <Link href="/notes">notes</Link>
          {' | '}
          <Link href="/users">users</Link>
          {' | '}
          <Link href="/notes/new">create new</Link>
        </nav> */}

        <AuthSessionProvider>
          <NavBar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}
