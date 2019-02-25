import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs, user }) => {
  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const response = await blogService.update(blog.id, updatedBlog)
      if (response) {
        setBlogs(
          blogs
            .map((b) => (b.id === blog.id ? response : b))
            .sort((a, b) => b.likes - a.likes)
        )
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
