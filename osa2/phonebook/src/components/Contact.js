import React from 'react'

const Contact = ({ name, number, handleRemove }) => {
  return (
    <div>
      {name} {number} <button onClick={handleRemove}>poista</button>
    </div>
  )
}

export default Contact
