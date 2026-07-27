import { eq, sql } from 'drizzle-orm'
import { db } from '../../db'
import { notes, users } from '../../db/schema'

// const notes1 = [
//   {
//     id: 1,
//     content: 'next.js utilizes React Server Components',
//     important: true,
//   },
//   { id: 2, content: 'next.js is built on top of React', important: true },
//   {
//     id: 3,
//     content: 'next.js supports both static and dynamic rendering',
//     important: false,
//   },
// ]

// let nextId = 4

export const getNotes = async (importantOnly: boolean) => {
  if (importantOnly) {
    return db.query.notes.findMany({
      where: eq(notes.important, true),
    })
  }

  return db.query.notes.findMany()
}

export const addNote = async (content: string, important: boolean) => {
  // notes1.push({ id: nextId++, content, important })

  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  await db.insert(notes).values({ content, important, userId: user!.id })
}

export const getNoteById = async (id: number) => {
  // return notes1.find((note) => note.id === id)
  return db.query.notes.findFirst({
    where: eq(notes.id, id),
  })
}

export const toggleImportance = async (id: number) => {
  // const note = notes1.find((note) => note.id === id)
  const note = await getNoteById(id)

  if (note) {
    // note.important = !note.important
    await db
      .update(notes)
      .set({ important: !note.important })
      .where(eq(notes.id, id))
  }
}
