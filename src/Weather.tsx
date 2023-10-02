import React from "react";
import axios from "axios";
import { useState } from "react";

interface City {
  name: string;
  weather: Array<{ description: string }>;
  main: {
    temp: number;
    feels_like: number;
  };
}

const Weather: React.FC = () => {
  const [cityName, setСityName] = useState("");
  const [city, setCity] = useState<City | null>(null);

  const getWeather = async () => {
    try {
      const response = await axios.get<City>(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=042b2ee2c83661dfb42ab95b64d38260&lang=ru&units=metric`
      );

      setCity(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
        <div className="row">
      <div className="col-lg-12">
        <h1>Узнать погоду приложение</h1>
        <input
          type="text"
          placeholder="Введите город"
          value={cityName}
          onChange={(event) => setСityName(event.target.value)}
        />
        <button onClick={getWeather}>Узнать погоду</button>
        {city && (
          <div className="weatherInfo mt-3">
            <p className="text-start">Город: {city.name}</p>
            <p className="text-start">
              Температура: {Math.ceil(city.main.temp)}&deg;
            </p>
            <p className="text-start">
              Ощущается как:
              {Math.ceil(city.main.feels_like)}&deg;
            </p>
            <p className="text-start">
              Описание: {city.weather[0].description}
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Weather;