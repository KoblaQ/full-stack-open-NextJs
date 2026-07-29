import { eq, ilike, sql } from 'drizzle-orm'
import { db } from '../../db'
import { blogs, users } from '../../db/schema'
import { getCurrentUser } from './sessions'

// const blogs1 = [
//   {
//     id: 1,
//     title: 'First Blog',
//     author: 'Kobla',
//     url: 'https://fullstackopen.com/en/',
//     likes: 44,
//   },
//   {
//     id: 2,
//     title: 'Second Blog',
//     author: 'Fafa',
//     url: 'https://fullstackopen.com/en/',
//     likes: 84,
//   },
// ]

// let nextId = 3

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`), // for fitering
    })
  }

  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
  // blogs1.push({ id: nextId++, title, author, url, likes: 0 })

  // const user = await db.query.users.findFirst({
  //   orderBy: sql`RANDOM()`,
  // })

  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Not logged in')
  }

  await db.insert(blogs).values({ title, author, url, userId: user!.id })
}

export const getBlogById = async (id: number) => {
  // return blogs1.find((blog) => blog.id === id)
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addLike = async (id: number) => {
  // console.log('liked')

  // const blog = blogs1.find((blog) => blog.id === id)
  const blog = await getBlogById(id)

  if (blog) {
    // blog.likes++
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id)) // (blog.likes ?? 0) because it could be null
  }

  // console.log(blogs)
}
