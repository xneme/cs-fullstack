import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(createAnecdote(event.target.newAnecdote.value))
    store.dispatch(
      showNotification(`You added '${event.target.newAnecdote.value}'`)
    )
    setTimeout(() => store.dispatch(clearNotification()), 5000)
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

export default AnecdoteForm
