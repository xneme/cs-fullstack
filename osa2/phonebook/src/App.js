import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setContacts(initialContacts)
    })
  }, [])

  const contactsToShow = contacts.filter(
    (contact) => contact.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  )

  const handleNameChange = (event) => {
    // console.log('newName', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log('newNumber', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // console.log('filter', event.target.value)
    setFilter(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    // console.log('Adding: ', newName, newNumber)
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newName.toLowerCase()
    )
    if (existingContact) {
      updateContact(existingContact)
    } else {
      contactService
        .create({ name: newName, number: newNumber })
        .then((newContact) => {
          setContacts(contacts.concat(newContact))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const updateContact = (existingContact) => {
    if (
      window.confirm(
        `${
          existingContact.name
        } on jo luettelossa, korvataanko vanha numero uudella?`
      )
    ) {
      contactService
        .update(existingContact.id, { ...existingContact, number: newNumber })
        .then((returnedContact) => {
          setContacts(
            contacts.map((contact) =>
              contact.id !== existingContact.id ? contact : returnedContact
            )
          )
        })
        .catch((error) => {
          alert(
            `${
              existingContact.name
            } on valitettavasti jo poistettu palvelimelta`
          )
          setContacts(
            contacts.filter((contact) => contact.id !== existingContact.id)
          )
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const removeContact = (contact) => {
    if (window.confirm(`Poistetaanko ${contact.name}?`)) {
      contactService
        .remove(contact.id)
        .then((id) => {
          setContacts(contacts.filter((contact) => contact.id !== id))
        })
        .catch((error) => {
          setContacts(contacts.filter((c) => c.id !== contact.id))
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter filter={filter} filterChangeHandler={handleFilterChange} />

      <h3>lisää uusi</h3>

      <ContactForm
        newName={newName}
        nameChangeHandler={handleNameChange}
        newNumber={newNumber}
        numberChangeHandler={handleNumberChange}
        addContact={addContact}
      />

      <h3>Numerot</h3>

      <Contacts contacts={contactsToShow} removeContact={removeContact} />
    </div>
  )
}

export default App
