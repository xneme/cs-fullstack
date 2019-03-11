import React from 'react'

const ButtonGroup = ({ setView, token, logout }) => {
  if (token) {
    return (
      <div>
        <button onClick={() => setView('AUTHORS')}>authors</button>
        <button onClick={() => setView('BOOKS')}>books</button>
        <button onClick={() => setView('ADD_BOOK')}>add book</button>
        <button onClick={() => setView('RECOMMENDATIONS')}>
          recommendations
        </button>
        <button onClick={logout}>logout</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setView('AUTHORS')}>authors</button>
      <button onClick={() => setView('BOOKS')}>books</button>
      <button onClick={() => setView('LOGIN')}>login</button>
    </div>
  )
}

export default ButtonGroup
