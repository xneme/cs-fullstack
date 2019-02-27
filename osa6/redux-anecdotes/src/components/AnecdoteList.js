import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const state = store.getState()
  const anecdotes = state.anecdotes
  const filter = state.filter

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const handleVote = (anecdote) => {
    store.dispatch(vote(anecdote.id))
    store.dispatch(showNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => store.dispatch(clearNotification()), 5000)
  }

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
