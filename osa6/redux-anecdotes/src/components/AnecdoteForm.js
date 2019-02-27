import React from 'react'
import { connect } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'
import {
  showNotificationAction,
  clearNotificationAction
} from '../reducers/notificationReducer'

const AnecdoteForm = ({
  createAnecdote,
  showNotification,
  clearNotification
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    createAnecdote(event.target.newAnecdote.value)
    showNotification(`You added '${event.target.newAnecdote.value}'`)
    setTimeout(() => clearNotification(), 5000)
    event.target.newAnecdote.value = ''
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote: createAnecdoteAction,
  showNotification: showNotificationAction,
  clearNotification: clearNotificationAction
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
