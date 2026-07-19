const blogs = [
  {
    id: 1,
    title: 'First Blog',
    author: 'Kobla',
    url: 'https://fullstackopen.com/en/',
    likes: 44,
  },
  {
    id: 2,
    title: 'Second Blog',
    author: 'Fafa',
    url: 'https://fullstackopen.com/en/',
    likes: 84,
  },
]

let nextId = 3

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}
