import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Weather from '../components/Weather'

const Search = ({ search, setSearch, weatherData, loading, fetchWeatherData, handleSearch, fetchForecast, forecastData, filterforecast }) => {

  async function handleSearch() {
    fetchWeatherData(search);
    fetchForecast(search);
  }

  // whenever the page load there is a defalut city details is showing
  // useEffect(()=> {
  //   fetchWeatherData("jaipur")
  // }, [])

  console.log(weatherData)

  return (
    <div className='pt-3'>      
      <SearchBar 
      search={search} 
      setSearch={setSearch} 
      handleSearch={handleSearch} 
      />  

      {
        loading ? <div>Loading....Please Wait!</div>
        : <div>

          <Weather weather={weatherData} />

          {/* for forecastdata  */}
          <div className="pb-8">
            {
              forecastData && <div className="max-w-[700px] mx-auto">
                <h2 className="text-center text-2xl text-emerald-200 mb-5">5-Days Forecast</h2>
                
                <div className="flex justify-between">
                  <p className="text-[19px] text-emerald-400 mb-1" >Date</p>
                  <p className="text-[19px] text-emerald-400 mb-1 text-center ">Temperature °C</p>
                  <p className="text-[19px] text-emerald-400 mb-1" >Weather</p>
                </div>

                {filterforecast(forecastData).map((day)=> {
                  return <div className="flex justify-between space-y-1">
                    <p className="w-1/4" >{day.dt_txt.split(" ")[0]}</p>
                    <p className="w-1/3 text-center">{day.main.temp} °C</p>
                    <p className="w-1/3 text-right">{day.weather[0].description}</p>
                  </div>
                })}
              </div>                            
            }
          </div>
        </div>
      }

    </div>
  )
}

export default Search
