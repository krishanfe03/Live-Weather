import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Weather from '../components/Weather'

const Search = ({ search, setSearch, weatherData, loading, fetchWeatherData, fetchForecast, forecastData, filterforecast }) => {

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

          {weatherData && <Weather weather={weatherData} />}

          {/* for forecastdata  */}
          <div className="pb-8">
            {forecastData && filterforecast(forecastData).length > 0 && (
              <div className="max-w-[700px] mx-auto">
                <h2 className="text-center text-2xl text-emerald-200 mb-5">
                  5-Days Forecast
                </h2>

                <div className="flex justify-between">
                  <p className="text-[19px] text-emerald-400 mb-1">Date</p>
                  <p className="text-[19px] text-emerald-400 mb-1 text-center ">
                    Temperature °C
                  </p>
                  <p className="text-[19px] text-emerald-400 mb-1">Weather</p>
                </div>

                {filterforecast(forecastData).map((day, index) => {
                  const date = day?.dt_txt ? day.dt_txt.split(" ")[0] : "N/A";
                  const temp =
                    day?.main?.temp !== undefined
                      ? `${day.main.temp} °C`
                      : "N/A";
                  const desc =
                    day?.weather && day.weather[0]?.description
                      ? day.weather[0].description
                      : "N/A";

                  return (
                    <div className="flex justify-between space-y-1" key={index}>
                      <p className="w-1/4">{date}</p>
                      <p className="w-1/3 text-center">{temp}</p>
                      <p className="w-1/3 text-right">{desc}</p>
                    </div>
                  );
                })}

              </div>

            )}
          </div>

        </div>
      }

    </div>
  )
}

export default Search
