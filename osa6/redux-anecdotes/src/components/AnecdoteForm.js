import React from 'react'
import { connect } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'
import { showNotificationAction } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, showNotification }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    createAnecdote(content)

    showNotification(`You added '${content}'`)
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
  showNotification: showNotificationAction
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
