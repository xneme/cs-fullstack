import React from 'react'
import CommentForm from './CommentForm'

const Comments = ({ comments, blogId }) => {
  if (!comments) {
    return null
  }
  return (
    <div>
      <h3>comments</h3>
      <CommentForm blogId={blogId} />
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
