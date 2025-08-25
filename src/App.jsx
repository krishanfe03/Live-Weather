import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Home from "./pages/Home";

const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // fetch the weatherData 
  async function fetchWeatherData(city) {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a274859618909cba6396e138b1e9a7dd`
      );

      const data = await response.json();

      console.log(data);
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  }

  const [forecastData, setForecastData] = useState(null);

  // fetch the 5-Days forecast data 
  async function fetchForecast(city, lat, lon) {
    try {
      
      let url = "";

      if(lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=a274859618909cba6396e138b1e9a7dd`
      }
      else {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=a274859618909cba6396e138b1e9a7dd`
      }      

      const response = await fetch(url);     
      const data = await response.json();
      console.log(data)
      setForecastData(data);
    } 
    catch (error) {
      console.log(error)
      
    }
  }

  // filter out the forecastData 5-days
  function filterforecast(forecastData) {
    if (!forecastData || !forecastData.list) return [];
    const filterdate = [];
    
    forecastData.list.map((item)=> {
      const [date, time] = item.dt_txt.split(" "); //get the date and time 

      if(time === "12:00:00"){
        filterdate.push(item);
      }
    })

    console.log(filterdate)

    return filterdate;
  }

  filterforecast(forecastData)

  return (
    <div className="app">
      <nav className="max-w-[300px] mx-auto p-10 flex justify-between" >
        <Link to='/' className="bg-emerald-200 px-5 py-1 rounded-[2px] text-black" >Home</Link>       
        <Link to='/search' className="bg-emerald-200 px-5 py-1 rounded-[2px] text-black" >Search</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              fetchWeatherData={fetchWeatherData}
              weatherData={weatherData}
              fetchForecast={fetchForecast}              
              forecastData={forecastData}
              filterforecast={filterforecast}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />

        <Route
          path="/search"
          element={
            <Search
              search={search}
              setSearch={setSearch}
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              loading={loading}
              setLoading={setLoading}
              fetchWeatherData={fetchWeatherData}
              fetchForecast={fetchForecast}
              forecastData={forecastData}
              filterforecast={filterforecast}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;


