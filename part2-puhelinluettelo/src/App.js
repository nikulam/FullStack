import React, { useState, useEffect } from 'react'
import Search from "./components/Search"
import Persons from "./components/Persons"
import FilterNames from "./components/FilterNames"
import personService from './services/persons.js'
import Notification from "./components/Notification"
import "./index.css"
import { set } from 'mongoose'

const App = () => {
  const [ persons, setPersons] = useState([]) 

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [newSearch, setNewSearch ] = useState('')

  const [ message, setMessage ] = useState('')


  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setNewSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    const person = persons.find((n) => n.name === newName)

    persons.forEach(n => console.log(n))

    if(persons.map(n => n.name).includes(newName) && persons.map(n => n.number).includes(newNumber)) {
      alert(`${newName} is already added to phonebook`)
    }
    else if(persons.map(n => n.name).includes(newName)) {
      const found = persons.filter(n => n.name == newName)[0]
      const updatedPerson = {name: newName, number: newNumber, id: found.id}
      setMessage("Updated " + updatedPerson.name)
      setTimeout(() => {
        setMessage(null)
      }, 3000)

      setPersons(persons.filter(n => n.id != found.id).concat(updatedPerson))      

      personService
        .update(found.id, updatedPerson)
        .then(console.log(updatedPerson))
    }
    
    else {
      const newPerson = {name: newName, number: newNumber}      
      
      personService
        .create(newPerson)
        .then(response => {
          setMessage("Added " + newPerson.name)
          setPersons(persons.concat(newPerson))
        })
        .catch(error => {
          setMessage(error.response.data.error)
          console.log(error.response.data.error)
        })

        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
    e.preventDefault()
  }

  const handleDelete = (e, person) => {
    
    const confirmed = window.confirm("Delete " + person.name + " ?")

      if(confirmed) {
        personService
          .remove(person.id)
          .then(response => {
          })
        setPersons(persons.filter(n => n.id !== person.id))
        setMessage("Deleted " + person.name)
        setTimeout(() => {
  
          setMessage(null)
        }, 3000)
      }
      e.preventDefault()

  }

  return (
    <div>
      <Notification message={message}/>
      <h2>Phonebook</h2>
        <Search handleSearch={handleSearch}/>
      <h2>add a new</h2>
        <Persons handleName={handleName} handleNumber={handleNumber} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
        <FilterNames arr={persons} str={newSearch} handleDelete={handleDelete}/>
    </div>
  )
  

}

export default App