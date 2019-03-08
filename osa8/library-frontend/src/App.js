import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import { gql } from 'apollo-boost'
import BirthYearForm from './components/BirthYearForm'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      id
      title
      author
      published
      genres
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editBirthYear($name: String!, $birthYear: Int!) {
    editAuthor(name: $name, setBornTo: $birthYear) {
      name
      born
      bookCount
    }
  }
`

const ButtonGroup = ({ setView }) => {
  return (
    <div>
      <button onClick={() => setView('AUTHORS')}>authors</button>
      <button onClick={() => setView('BOOKS')}>books</button>
      <button onClick={() => setView('ADD_BOOK')}>add book</button>
    </div>
  )
}

const App = () => {
  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)
  const addBook = useMutation(CREATE_BOOK, {
    onError: (error) => console.log(error),
    refetchQueries: [{ query: ALL_BOOKS }]
  })
  const editAuthor = useMutation(EDIT_AUTHOR, {
    onError: (error) => console.log(error),
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const [view, setView] = useState('AUTHORS')

  switch (view) {
    case 'AUTHORS':
      return (
        <div>
          <ButtonGroup setView={setView} />
          <Authors result={allAuthorsResult} />
          <BirthYearForm result={allAuthorsResult} editAuthor={editAuthor} />
        </div>
      )
    case 'BOOKS':
      return (
        <div>
          <ButtonGroup setView={setView} />
          <Books result={allBooksResult} />
        </div>
      )
    case 'ADD_BOOK':
      return (
        <div>
          <ButtonGroup setView={setView} />
          <BookForm addBook={addBook} />
        </div>
      )
    default:
      return <div />
  }
}

export default App
