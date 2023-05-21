// import logo from './logo.svg';
import './App.css';
import { weather } from './weather'
import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);



function App() {

  const [location, setLocation] = useState('Kolkata')
  const [selectedCityData, setSelectedCityData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const searchWeatherData = () => {
    const selectedCity = weather.find(cityData => cityData.city === location);
    if (selectedCity) {

      const cityWeatherData = selectedCity.data;
      const label = cityWeatherData.map(data => data.date)
      const temperature = cityWeatherData.map(data => data.temperature)
      const wind = cityWeatherData.map(data => data.windSpeed)
      setSelectedCityData(cityWeatherData);
      setLabels(label);
      setTemperatures(temperature);
      setWindSpeed(wind);
    } else {
      
      setSelectedCityData([]);
    }
  };
  // searchWeatherData()
  useEffect(() => {
    searchWeatherData();
  }, []);
  // const weather = async () => {
  //   const res = await fetch(`${url}/api`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ product: data })
  //   })
  // }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        fill: true,
        borderColor: 'rgb(10, 192, 192)',

        tension: 0.3,
      },
    ],
  };
  const windSpeedData = {
    labels,
    datasets: [
      {
        label: 'Wind Speed',
        data: windSpeed,
        fill: false,
        borderColor: 'rgb(75, 192, 100)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="">
      <form className="justify-center flex mt-5">
        <div className="flex w-full items-center space-x-2 md:w-1/3">
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={(e) => {
              e.preventDefault();
              searchWeatherData();
            }}
          >
            Search
          </button>

        </div>
      </form>
      <div className="grid grid-cols-2 p-5">
        <div>
          {chartData && <Line data={chartData} />}
        </div>
        <div>
          {windSpeedData && <Bar data={windSpeedData} />}
        </div>
      </div>


    </div>
  );
}

export default App;
