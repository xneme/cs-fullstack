import React from 'react'
import Header from './Header'

const Content = ({ parts }) => {
  const rows = () =>
    parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))

  return <>{rows()}</>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)

  return <p>yhteensä {total} tehtävää</p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
