import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Anecdote = ({ anecdotes, index, votesArray }) => {
  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>has {votesArray[index]} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const randomIndex = (limit) => {
    return Math.floor(Math.random() * limit)
  }

  const mostVotesIndex = (votes) => {
    const copy = [...votes]
    return copy.indexOf(Math.max(...copy))
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote
        anecdotes={props.anecdotes}
        index={selected}
        votesArray={votes}
      />
      <Button
        text="next anecdote"
        handleClick={() => setSelected(randomIndex(props.anecdotes.length))}
      />
      <Button
        text="vote"
        handleClick={() => {
          const copy = [...votes]
          copy[selected] += 1
          setVotes(copy)
        }}
      />
      <Header text="Anecdote with most votes" />
      <Anecdote
        anecdotes={props.anecdotes}
        index={mostVotesIndex(votes)}
        votesArray={votes}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
