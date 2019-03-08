import React, { useState } from 'react'

const BirthYearForm = ({ result, editAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleBirthYearChange = async () => {
    await editAuthor({
      variables: { name, birthYear: Number(born) }
    })
    setName('')
    setBorn('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h3>set birthyear</h3>
      <div>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {result.data.allAuthors.map((author) => {
            return (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            )
          })}
        </select>
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
