import React, {useEffect, useState} from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)
  const [ error, setError ] = useState(false) // for changing the notification color from green to red
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
   

  const addPerson = (event) => {
    event.preventDefault() 
    if (persons.some(p => p.name === newName)) {
      confirmPersonUpdate() // pop-up where user allows or denies update
      return 
    } 
    const personObject = {
      name: newName,
      number: newNumber     
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        actionSuccess(`Added ${returnedPerson.name}`)
      })
  }


  const confirmPersonUpdate = () => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const personsId = persons.filter(p => p.name === newName).map(p => p.id)[0] // taulukko jossa yksi alkio, [id] -> taulukosta pois muuttujaan personsId   
      updatePerson(personsId, newNumber)
    }
  }


  const updatePerson = (id, newNumber) => {    
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber} 
    personService
      .update(id, changedPerson)
      .then(returnedPerson => {     
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson)) // onko !== ehtoTosi ? on : eiOle
        actionSuccess(`Updated ${returnedPerson.name}`)
      })
      .catch(error => {
        errorNotification(`Information of ${person.name} has already been removed from the server`)    
      })  
  }
  

  const deletePerson = (id) => {
    const personName = persons.filter(p => p.id === id).map(p => p.name) 
    if (window.confirm(`Delete ${personName}`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id)) 
        actionSuccess(`Deleted ${personName}`)
      })
      .catch(error => {
        errorNotification(`${personName} has already been removed from the server`)    
      }) 
    }  
  }


  const actionSuccess = (message) => {
    setAlertMessage(
      message
    )
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }


  const errorNotification = (message) => {
    setError(true)
    setAlertMessage(
      message
    )
    setTimeout(() => {
      setAlertMessage(null)
      setError(false) 
    }, 5000)
  } 


  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={alertMessage} error={error} />
        
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new person</h2>
      
      <PersonForm handlePersonAdd={addPerson} 
                  name={newName} handleNameChange={handleNameChange} 
                  number={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} handlePersonDelete={deletePerson} />    
    </div>
  )
}

export default App
