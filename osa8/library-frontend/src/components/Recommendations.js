import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const Recommendations = ({ user, refetchTrigger }) => {
  if (!user) {
    console.log('user not found')
    return <div>loading...</div>
  }

  const [books, setBooks] = useState([])
  const booksByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: user.favoriteGenre
    }
  })

  useEffect(() => {
    if (!booksByGenre.loading) {
      setBooks(booksByGenre.data.allBooks)
    }
  }, [booksByGenre])

  useEffect(() => {
    booksByGenre.refetch()
  }, [refetchTrigger])

  if (booksByGenre.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      {user ? (
        <p>
          books in your favorite genre <b>{user.favoriteGenre}</b>
        </p>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => {
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
    </div>
  )
}

export default Recommendations
