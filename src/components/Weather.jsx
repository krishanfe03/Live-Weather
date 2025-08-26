import React from "react";

const Weather = ({ weather }) => {

  function getCurrentDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday : 'long',
      month : 'long',
      day : 'numeric',
      year : 'numeric'
    })
  }

  return (
    <div className="max-w-[500px] mx-auto text-center" >
      {weather && (
        <div className="w-full min-h-[400px] space-y-15 border border-slate-300 rounded-[3px] p-7 mb-10" >

          {/* city name  */}
          <div>
            <h2 className="text-2xl text-emerald-200">{weather.name || ""}, <span>{weather.sys && weather.sys.country ? weather.sys.country : ""}</span></h2>
          </div>

          {/* description + icon */}
          <div className="text-center flex flex-col items-center gap-8 " >
            {/* desc   */}
            <p>{weather.weather && weather.weather[0] ? weather.weather[0].description : ""}</p>

            {/* icon  */}
            {weather.weather && weather.weather[0] && (
              <img className="w-20 h-20" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            )}

          </div>

          {/* date and time  */}
          <div>
            <span>{getCurrentDate()}</span>
          </div>

          {/* temperature */}
          <div>
            <p>
              <span>
                {weather.main && weather.main.temp !== undefined ? `${Math.floor(weather.main.temp)} °C` : "N/A"}
              </span>
              </p>
          </div>


          {/* weather info  */}
          <div className="flex justify-between">
            {/* wind */}
            <div className="flex gap-8">
              <p>{weather.wind && weather.wind.speed !== undefined ? weather.wind.speed : "N/A" }</p>
              <p>Wind Speed</p>
            </div>

            {/* humidity  */}
            <div className="flex gap-8">
              <p>{weather.main && weather.main.humidity !== undefined ? weather.main.humidity : "N/A"}%</p>
              <p>Humidity</p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Weather;
