import React from 'react'

const Authors = ({ result }) => {
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((author) => {
            return (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.born || ''}</td>
                <td>{author.bookCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
