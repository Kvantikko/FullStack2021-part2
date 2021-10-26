import React, {useEffect, useState} from 'react'
import Filter from './components/Filter'
import CountrySuggestions from './components/CountrySuggestions'
import Country from './components/Country'
import axios from 'axios'

const App = () => {
  // muista: tilaa muuttavan funktion kutsuminen aiheuttaa komponentin uudelleenrenderöitymisen -> setCountries, setWeather, ...
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newFilteredCountries, setFilteredCountries] = useState([])
  const [ newCapital, setNewCapital ] = useState('helsinki')
  const [ weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
         .then(response => {
            setCountries(response.data)
    })
  }, [])
  

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${newCapital}&appid=${api_key}`)
         .then(response => {
            setWeather(response.data) 
    })
  }, [newCapital, api_key])


  useEffect(() => {
    setFilteredCountries(
      countries.filter(c => c.name.common.toLowerCase().includes(newFilter.toLowerCase()))     
    ) 
  }, [newFilter, countries])


  useEffect(() => {
    if (newFilteredCountries.length === 1) {
      setNewCapital(newFilteredCountries[0].capital)
    }
  }, [newFilteredCountries])
  

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  
  const handleButtonClick = (event) => {
    setNewFilter(event.target.value) 
  }


  return (
    <div>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <CountrySuggestions countries={newFilteredCountries} filter={newFilter} handleClick={handleButtonClick}/>
      <Country countries={newFilteredCountries} weather={weather}/>
    </div>
  )
}

export default App
