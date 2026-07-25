import Link from 'next/link'
import { getNotes } from '../services/notes'

// import NoteList from './NoteList'

const Notes = async ({
  searchParams,
}: {
  searchParams: Promise<{ important?: string }>
}) => {
  const { important } = await searchParams
  const showImportant = important === 'true'
  // const allNotes = await getNotes()
  // const notes = showImportant
  //   ? allNotes.filter((note) => note.important)
  //   : allNotes

  const notes = await getNotes(showImportant)

  // const notes = getNotes()
  return (
    <div>
      <h2>Notes</h2>

      <div>
        <Link href={showImportant ? '/notes' : '/notes?important=true'}>
          {showImportant ? 'show all' : 'show important only'}
        </Link>
      </div>

      {/* <NoteList notes={notes} /> */}

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.content}</Link>{' '}
            {note.important && <strong>(important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes
