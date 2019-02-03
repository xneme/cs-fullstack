import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts, removeContact }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          number={contact.number}
          handleRemove={() => removeContact(contact)}
        />
      ))}
    </div>
  )
}

export default Contacts
