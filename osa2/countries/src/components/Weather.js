import React from 'react'

const Weather = ({ capital, weather }) => {
  if (weather.length === 0) {
    return <div />
  } else {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <div>temperature: {weather.current.temp_c} Celcius</div>
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
        />
        <div>
          wind: {weather.current.wind_kph} kph direction{' '}
          {weather.current.wind_dir}
        </div>
      </div>
    )
  }
}

export default Weather
