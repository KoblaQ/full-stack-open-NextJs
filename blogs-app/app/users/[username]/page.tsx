import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUserWithBlogs } from '../../services/users'

// const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  // const { id } = await params
  const { username } = await params

  // const user = await getUserWithBlogs(Number(id))
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2x1 mx-auto p-6 space-y-2 border rounded">
      <h2 className="text-2x1 font-bold">{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3 className="text-xl font-bold">Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
