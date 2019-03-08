import React, { useState } from 'react'

const BirthYearForm = ({ editAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleBirthYearChange = async () => {
    await editAuthor({
      variables: { name, birthYear: Number(born) }
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>set Birthyear</h3>
      <div>
        <label>name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>born</label>
        <input
          type="text"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
      </div>
      <button onClick={handleBirthYearChange}>update author</button>
    </div>
  )
}

export default BirthYearForm
