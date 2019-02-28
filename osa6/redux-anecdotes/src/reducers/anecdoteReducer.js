const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      return state
        .map((anecdote) =>
          anecdote.id !== action.data.id
            ? anecdote
            : { ...anecdote, votes: anecdote.votes + 1 }
        )
        .sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdoteAction = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const voteAction = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotesAction = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer
