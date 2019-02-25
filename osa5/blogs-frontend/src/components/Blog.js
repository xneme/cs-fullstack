import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (expanded) {
    return (
      <div className="blog" style={blogStyle}>
        <div onClick={toggleExpanded}>
          {blog.title} - {blog.author}
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {user.username === blog.user.username ? (
          <button onClick={handleRemove}>remove</button>
        ) : (
          ''
        )}
      </div>
    )
  } else {
    return (
      <div className="blog" onClick={toggleExpanded} style={blogStyle}>
        {blog.title} - {blog.author}
      </div>
    )
  }
}

export default Blog
