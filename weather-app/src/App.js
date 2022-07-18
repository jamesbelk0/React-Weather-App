import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [ data, setData ] = useState({});
  const [ location, setLocation ] = useState('');

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=87e4dd356fec77ea01cd2c3d336cadc1`;

  const inputLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(api).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }


  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={inputLocation}
        placeholder='Enter City Name'
        type='text'
        />
      </div>
      <div className='container'>
        <div className='primary'>
          <div className='city'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className='clouds'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
        <div className='extra'>
          <div className='feelsLike'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
