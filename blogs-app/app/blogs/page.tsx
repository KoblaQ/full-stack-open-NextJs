import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = getBlogs()
  const blogsToShow = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : allBlogs

  return (
    <div>
      <h2>Blogs</h2>

      <form action="/blogs">
        <input type="text" name="filter" defaultValue={filter ?? ''} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {blogsToShow
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>
                <em>{blog.title}</em> by {blog.author}
              </Link>
              {/* <a href={blog.url} className="blogUrl">
              {blog.url}
            </a>
            <p>{blog.likes} likes</p> */}
              <hr />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Blogs
