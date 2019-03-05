import React from 'react'
import Blog from './Blog'
import {
  successNotificationAction,
  errorNotificationAction
} from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { likeBlogAction, removeBlogAction } from '../reducers/blogReducer'

const BlogList = ({
  blogs,
  user,
  successNotification,
  errorNotification,
  likeBlog,
  removeBlog
}) => {
  const handleLike = async (blog) => {
    try {
      likeBlog(blog)
      successNotification(`You voted ${blog.title}.`)
    } catch (exception) {
      console.log(exception)
      errorNotification(exception)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        removeBlog(blog)
        successNotification(`${blog.title} removed.`)
      } catch (exception) {
        console.log(exception)
        errorNotification(exception)
      }
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  successNotification: successNotificationAction,
  errorNotification: errorNotificationAction,
  likeBlog: likeBlogAction,
  removeBlog: removeBlogAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
