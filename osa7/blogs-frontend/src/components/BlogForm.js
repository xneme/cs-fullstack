import React from 'react'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import {
  successNotificationAction,
  errorNotificationAction
} from '../reducers/notificationReducer'
import { createBlogAction } from '../reducers/blogReducer'

const BlogForm = ({ successNotification, errorNotification, createBlog }) => {
  const { reset: titleReset, ...title } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: urlReset, ...url } = useField('text')
  const blogFormRef = React.createRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      })

      successNotification(`a new blog ${title.value} added`)

      titleReset()
      authorReset()
      urlReset()
    } catch (exception) {
      console.log(exception)
      if (exception.response) {
        errorNotification(exception.response.data.error)
      }
    }
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

const mapDispatchToProps = {
  successNotification: successNotificationAction,
  errorNotification: errorNotificationAction,
  createBlog: createBlogAction
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)
