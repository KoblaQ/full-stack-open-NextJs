import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <p>
              <em>{blog.title}</em> by {blog.author}
            </p>
            <a href={blog.url} className="blogUrl">
              {blog.url}
            </a>
            <p>{blog.likes} likes</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
