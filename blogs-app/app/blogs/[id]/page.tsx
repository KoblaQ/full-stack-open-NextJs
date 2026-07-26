import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'
import { addBlogLike } from '../../actions/blogs'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

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
      <p>{blog.likes} likes</p>{' '}
      <form action={addBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  )
}

export default BlogPage
