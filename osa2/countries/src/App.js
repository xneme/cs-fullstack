import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Content from './components/Content'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(
    (country) => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  )

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter filter={filter} filterChangeHandler={handleFilterChange} />
      <Content countries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

export default App
