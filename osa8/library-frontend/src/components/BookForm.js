import React, { useState } from 'react'

const BookForm = ({ addBook }) => {
  const [genres, setGenres] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')

  const handleSubmit = async () => {
    await addBook({
      variables: { title, author, published: Number(published), genres }
    })

    setAuthor('')
    setTitle('')
    setPublished('')
    setGenres([])
    setGenre('')
  }

  const handleAddGenre = () => {
    setGenres([...genres, genre])
    setGenre('')
  }

  return (
    <div>
      <h2>Add book</h2>
      <div>
        <label>title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>published</label>
        <input
          type="text"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button onClick={handleAddGenre}>add genre</button>
      </div>
      <div>genres: {genres.map((genre) => `${genre} `)}</div>
      <button onClick={handleSubmit}>create book</button>
    </div>
  )
}

export default BookForm
