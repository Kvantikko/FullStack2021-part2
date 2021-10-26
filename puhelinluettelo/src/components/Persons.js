import React from 'react'
import Person from './Person'

const Persons = ({persons, filter, handlePersonDelete}) => {
    const personsToShow = (filter === '')
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    
    return(
        <div>
	        {personsToShow.map(person => 
                <Person key={person.name} name={person.name} number={person.number} handlePersonDelete={() => handlePersonDelete(person.id)}/>)}           
        </div>      
    )
}
 
export default Persons