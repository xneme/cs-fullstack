import React from 'react'

const ContactForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addContact}>
        <div>
          nimi:{' '}
          <input value={props.newName} onChange={props.nameChangeHandler} />
        </div>
        <div>
          numero:{' '}
          <input value={props.newNumber} onChange={props.numberChangeHandler} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
