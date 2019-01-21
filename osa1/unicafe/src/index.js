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
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const count = good + neutral + bad
  const score = good - bad

  if (count === 0) return <p>Ei yhtään palautetta annettu</p>

  return (
    <table>
      <tbody>
        <Statistic text="hyvä" value={good} />
        <Statistic text="neutraali" value={neutral} />
        <Statistic text="huono" value={bad} />
        <Statistic text="yhteensä" value={count} />
        <Statistic text="keskiarvo" value={score / count} />
        <Statistic text="positiivisia" value={(good / count) * 100 + '%'} />
      </tbody>
    </table>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
