import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotesAction } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = ({ initializeAnecdotes }) => {
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => initializeAnecdotes(anecdotes))
  }, [])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(
  null,
  { initializeAnecdotes: initializeAnecdotesAction }
)(App)
