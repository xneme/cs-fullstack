import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import {
  showNotificationAction,
  clearNotificationAction
} from '../reducers/notificationReducer'

const AnecdoteList = ({
  visibleAnecdotes,
  vote,
  showNotification,
  clearNotification
}) => {
  const handleVote = (anecdote) => {
    vote(anecdote.id)
    showNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => clearNotification(), 5000)
  }

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  vote: voteAction,
  showNotification: showNotificationAction,
  clearNotification: clearNotificationAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
