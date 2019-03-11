import React, { useState } from 'react'

const BirthYearForm = ({ result, editAuthor, handleError, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleBirthYearChange = async () => {
    try {
      await editAuthor({
        variables: { name, birthYear: Number(born) }
      })
    } catch (error) {
      handleError(error.message)
    }
    setName('')
    setBorn('')
  }

  if (!token) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  } else {
    return (
      <div>
        <h3>set birthyear</h3>
        <div>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="" disabled>
              Select author
            </option>
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
}

export default BirthYearForm
