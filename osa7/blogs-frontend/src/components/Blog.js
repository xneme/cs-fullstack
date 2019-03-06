import React, { useState } from 'react'
import {
  successNotificationAction,
  errorNotificationAction
} from '../reducers/notificationReducer'
import { likeBlogAction, removeBlogAction } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Comments from './Comments'
import { Button } from 'semantic-ui-react'

const Blog = ({
  blog,
  likeBlog,
  removeBlog,
  user,
  successNotification,
  errorNotification
}) => {
  const [deleted, setDeleted] = useState(false)

  const handleLike = async () => {
    try {
      likeBlog(blog)
      successNotification(`You voted ${blog.title}.`)
    } catch (exception) {
      console.log(exception)
      errorNotification(exception)
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await removeBlog(blog)
        successNotification(`${blog.title} removed.`)
        setDeleted(true)
      } catch (exception) {
        console.log(exception)
        errorNotification(exception)
      }
    }
  }

  if (deleted) {
    return <Redirect to="/" />
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <Button
          onClick={handleLike}
          content="Like"
          icon="heart"
          label={{ basic: true, content: blog.likes, pointing: 'right' }}
          labelPosition="left"
          id="likeButton"
        />
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username ? (
        <Button negative onClick={handleRemove}>
          remove
        </Button>
      ) : null}
      <Comments comments={blog.comments} blogId={blog.id} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const blog = state.blogs.find((blog) => blog.id === ownProps.id)
  return {
    blogs: state.blogs,
    user: state.user,
    blog
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
)(Blog)
