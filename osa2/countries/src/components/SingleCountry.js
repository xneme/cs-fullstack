import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=8986b25bdff5402fa7d200322192901&q=${
          country.capital
        }`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        style={{ width: 150 }}
        src={country.flag}
        alt={`flag of ${country.name}`}
      />
      <Weather capital={country.capital} weather={weather} />
    </div>
  )
}

export default SingleCountry
