import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
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
