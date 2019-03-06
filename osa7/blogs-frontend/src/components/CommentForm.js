import React from 'react'
import { commentBlogAction } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Form, Button, Input } from 'semantic-ui-react'

const CommentForm = ({ commentBlog, blogId }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    commentBlog(blogId, event.target.comment.value)
    event.target.comment.value = ''
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Input type="text" name="comment" />
        <Button type="submit">add comment</Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  commentBlog: commentBlogAction
}

export default connect(
  null,
  mapDispatchToProps
)(CommentForm)
