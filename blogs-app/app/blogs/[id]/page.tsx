import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <p>
        <em>{blog.title}</em> by {blog.author}
      </p>
      <a href={blog.url} className="blogUrl">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <hr />
    </div>
  )
}

export default BlogPage
