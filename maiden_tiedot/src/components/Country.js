import React from "react";
import Weather from "./Weather";

const Country = ({countries, weather}) => { 
    
    // haluamme renderöidä vain jos countries on yhden olion sisältävä array, eli filteröinnin jälkeen jäänyt jäljelle yksi maa
    
    if (countries === undefined || countries.length !== 1) {
        return null
    }

    const country = countries[0]
    
    return(  
        <div>          
            <h1> {country.name.common} </h1>
            
            <div> capital: {country.capital} </div>

            <div> population: {country.population} </div>

            <h2>Spoken languages</h2>

            {Object.values(country.languages).map(language => 
                <li key={language}> {language} </li>)}
              
            <p></p>
                    
            <img src={country.flags.png} alt="country_flag" width="200" height="auto" /> 

            <p></p>
            
            <Weather weather={weather}/>
                    
        </div>
    )
}

export default Country