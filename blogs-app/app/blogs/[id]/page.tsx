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
    <div className="max-w-2x1 mx-auto p-6 space-y-2 border rounded">
      <p>
        <em className="text-2x1 font-bold">{blog.title}</em> by {blog.author}
      </p>
      <a href={blog.url} className="text-blue-600 hover:underline">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>{' '}
      <form action={addBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
        >
          like
        </button>
      </form>
    </div>
  )
}

export default BlogPage
