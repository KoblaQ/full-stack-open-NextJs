import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  // const allBlogs = await getBlogs()
  // const blogsToShow = filter
  //   ? allBlogs.filter((blog) =>
  //       blog.title.toLowerCase().includes(filter.toLowerCase()),
  //     )
  //   : allBlogs

  const blogs = await getBlogs(filter)

  return (
    <div className="max-w-2x1 mx-auto p-6">
      <h2 className="text-2x1 font-bold mb-4">Blogs</h2>

      <form action="/blogs">
        <input type="text" name="filter" defaultValue={filter ?? ''} />
        <button type="submit">Search</button>
      </form>
      <ul className="space-y-2">
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map((blog) => (
            <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-600 hover:underline"
              >
                <em className="ml-2">{blog.title}</em> by {blog.author}
              </Link>
              {/* <a href={blog.url} className="blogUrl">
              {blog.url}
            </a>
            <p>{blog.likes} likes</p> */}
              {/* <hr /> */}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Blogs
