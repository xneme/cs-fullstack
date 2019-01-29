import React from 'react'

const CountryNames = ({ countries, setFilter }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}{' '}
          <button onClick={() => setFilter(country.name)}>show</button>{' '}
        </div>
      ))}
    </div>
  )
}

export default CountryNames
