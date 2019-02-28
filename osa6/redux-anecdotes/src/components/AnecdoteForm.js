import React from 'react'
import { connect } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'
import {
  showNotificationAction,
  clearNotificationAction
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = ({
  createAnecdote,
  showNotification,
  clearNotification
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    const savedAnecdote = await anecdoteService.createNew(content)
    createAnecdote(savedAnecdote)

    showNotification(`You added '${savedAnecdote.content}'`)
    setTimeout(() => clearNotification(), 5000)
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
