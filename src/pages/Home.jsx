import React, { useEffect } from "react";
import Weather from "../components/Weather";

const Home = ({
  weatherData,
  fetchWeatherData,
  fetchForecast,
  forecastData,
  filterforecast,
  loading,
  setLoading,
}) => {
  // for geolocation
  async function fetchCurrentLocation(lat, lon) {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=a274859618909cba6396e138b1e9a7dd`
      );

      const data = await res.json();
      console.log(data);

      if (data && data.length > 0 && data[0].name) {
        const currntcity =
          data[0].local_names && data[0].local_names.en
            ? data[0].local_names.en
            : data[0].name;
        fetchWeatherData(currntcity);

        setLoading(false);
      } else {
        fetchWeatherData("jaipur");
        setLoading(false);

      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      fetchWeatherData("jaipur");
    }
  }

  // get the lat lon if the browser is allow
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetchCurrentLocation(lat, lon);
          fetchForecast(null, lat, lon); // passing the null because here we not use the city name we use the coordinates lat and lon
        },
        (error) => {
          console.log("Geolocation denied", error);
          fetchWeatherData("jaipur");
          fetchForecast("jaipur");
        }
      );
    } else {
      fetchWeatherData("jaipur");
      fetchForecast("jaipur");
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...Please Wait!</div>
      ) : (
        <div>
          {/* for weather data  */}
          <div>
            {weatherData && (
              <div>
                <Weather weather={weatherData} />
              </div>
            )}
          </div>

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
      )}
    </div>
  );
};

export default Home;
