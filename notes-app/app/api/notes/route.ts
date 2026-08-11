import { NextResponse, NextRequest } from 'next/server'
import { getNotes, addNote } from '../../services/notes'
// import getServerSession from 'next-auth'
// import { authOptions } from '../../../lib/auth'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export const GET = async () => {
  const notes = await getNotes(false)
  return NextResponse.json(notes)
}

export const POST = async (req: NextRequest) => {
  // const session = await getServerSession(authOptions)
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { content, important = false } = body

  if (!content || content.length < 10) {
    return NextResponse.json(
      { error: 'content must be at least 10 characters' },
      { status: 400 },
    )
  }

  await addNote(content, important)
  revalidatePath('/notes')
  return NextResponse.json({ success: true }, { status: 201 })
}
