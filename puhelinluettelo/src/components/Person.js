import React from 'react'

const Person = ({name, number, handlePersonDelete}) => {
    return(
        <div>{name} {number} <button onClick={handlePersonDelete}> poista </button> </div>
    )
}

export default Person