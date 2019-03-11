import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import { gql } from 'apollo-boost'
import BirthYearForm from './components/BirthYearForm'
import Notification from './components/Notification'
import ButtonGroup from './components/ButtonGroup'
import LoginForm from './components/LoginForm'

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
      author {
        name
      }
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
      author {
        name
        born
      }
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const App = () => {
  const client = useApolloClient()
  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)
  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const editAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const login = useMutation(LOGIN)

  const [view, setView] = useState('AUTHORS')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)

  const handleError = (error) => {
    console.log(error)
    setNotification(error)
    setTimeout(() => setNotification(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (view === 'ADD_BOOK') {
      setView('AUTHORS')
    }
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('library-app-token'))
  }, [])

  switch (view) {
    case 'AUTHORS':
      return (
        <div>
          <ButtonGroup setView={setView} token={token} logout={logout} />
          <Notification message={notification} />
          <Authors result={allAuthorsResult} />
          <BirthYearForm
            result={allAuthorsResult}
            editAuthor={editAuthor}
            handleError={handleError}
            token={token}
          />
        </div>
      )
    case 'BOOKS':
      return (
        <div>
          <ButtonGroup setView={setView} token={token} logout={logout} />
          <Notification message={notification} />
          <Books result={allBooksResult} />
        </div>
      )
    case 'ADD_BOOK':
      return (
        <div>
          <ButtonGroup setView={setView} token={token} logout={logout} />
          <Notification message={notification} />
          <BookForm addBook={addBook} />
        </div>
      )
    case 'LOGIN':
      return (
        <div>
          <ButtonGroup setView={setView} token={token} logout={logout} />
          <LoginForm
            login={login}
            setToken={setToken}
            handleError={handleError}
            setView={setView}
          />
        </div>
      )
    default:
      return <div />
  }
}

export default App
