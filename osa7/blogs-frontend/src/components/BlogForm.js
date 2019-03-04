import React from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import {
  successNotificationAction,
  errorNotificationAction
} from '../reducers/notificationReducer'

const BlogForm = ({
  blogs,
  setBlogs,
  successNotification,
  errorNotification
}) => {
  const { reset: titleReset, ...title } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: urlReset, ...url } = useField('text')
  const blogFormRef = React.createRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const response = await blogService.create({
        title: title.value,
        author: author.value,
        url: url.value
      })

      setBlogs(blogs.concat(response))
      titleReset()
      authorReset()
      urlReset()

      console.log(`a new blog ${response.title} added`)
      successNotification(`a new blog ${response.title} added`)
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
  errorNotification: errorNotificationAction
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)
