import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text="anna palautetta" />
      <Button text="hyvä" handleClick={() => setGood(good + 1)} />
      <Button text="neutraali" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="huono" handleClick={() => setBad(bad + 1)} />
      <Header text="statistiikka" />
      <Statistic text="hyvä" value={good} />
      <Statistic text="neutraali" value={neutral} />
      <Statistic text="huono" value={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
