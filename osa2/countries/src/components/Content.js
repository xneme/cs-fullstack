import React from 'react'
import CountryNames from './CountryNames'
import SingleCountry from './SingleCountry'

const Content = ({ countries, setFilter }) => {
  if (countries.length > 10) {
    return <div>Too many countries, specify more filter</div>
  } else if (countries.length > 1) {
    return (
      <div>
        <CountryNames countries={countries} setFilter={setFilter} />
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <SingleCountry country={countries[0]} />
      </div>
    )
  } else {
    return <div>No countries found.</div>
  }
}

export default Content
