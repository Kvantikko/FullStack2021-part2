import React from "react";
import Button from "./Button";

const CountrySuggestions = ({countries, filter, handleClick}) => {
    
    if (filter === "" || countries === undefined || countries.length <= 1) {
        return null
    }
    
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
  
    return(
        <div>
            {countries.map(c => 
                <div key={c.name.common}> {c.name.common} <Button handleClick={handleClick} text={"show"} country={c.name.common} /> </div>)}
        </div>
    )
}

export default CountrySuggestions