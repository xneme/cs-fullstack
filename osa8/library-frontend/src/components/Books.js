import React, { useState } from 'react'

const Books = ({ result }) => {
  if (result.loading) {
    return <div>loading...</div>
  }

  const [filter, setFilter] = useState(null)

  const genres = result.data.allBooks.reduce((list, book) => {
    book.genres.forEach((genre) => {
      if (!list.includes(genre)) {
        list = list.concat(genre)
      }
    })
    return list
  }, [])

  const filteredBooks = filter
    ? result.data.allBooks.filter((book) => book.genres.includes(filter))
    : result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
