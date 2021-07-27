const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

// Initialize express xD
const app = express();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));


// Body parser middleware
app.use(bodyParser());

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));



// Global Variables
let location;
// Temperatures
let currentTemp;
let minTemp;
let maxTemp;

let humidity;
let windSpeed;
let cloudy;
let weatherIcon;


// This function will fetch weather DATA for a place and return that data as json
async function fetchData(place) {
  await axios({
    method: 'get',
    url: `https://api.weatherapi.com/v1/forecast.json?key=3070eb61182e45caa96162153212007&q=${place}&days=1&aqi=yes&alerts=yes`
  })
    .then((res) => {

      location = res.data.location.region;
      currentTemp = res.data.current.temp_c;
      humidity = res.data.current.humidity;
      windSpeed = res.data.current.wind_mph;
      cloudy = res.data.current.cloud;
      weatherIcon = res.data.current.condition.icon;
      minTemp = res.data.forecast.forecastday[0].day.mintemp_c;
      maxTemp = res.data.forecast.forecastday[0].day.maxtemp_c;
      weatherIcon = res.data.current.condition.icon;
    })
    .catch(err => console.log('Some error occured ' + err));
}



app.get('/', async (req, res) => {

	res.render('index', {
    title: 'Weather Explorer'
  });

});



app.post('/search', async (req, res) => {
  const search_location = req.body.form_location;
  await fetchData(search_location);

  res.render('search', {
    title: 'Weather Explorer',
    place: location,
    temperature: currentTemp + 'C°',
    minTemp: minTemp + 'C°',
    maxTemp: maxTemp + 'C°',
    humidity: humidity + '%',
    windspeed: windSpeed + ' mp/h',
    cloudy: cloudy,
    weatherIcon: weatherIcon
  });
});


// app.post('/searchWeather', async (req, res) => {
// 	await const myData = fetchData('India');
// 	res.send('Hello from search Weather');
// });


/*
app.post('/searchWeather', async (req, res) => {
	 const form_location = req.body.form_location;

   const myData = fetchData(form_location);
   console.log(myData)
   res.send(myData);



});
*/
const port = 8080;


app.listen(port, () => console.log('Server started on port ' + port));
