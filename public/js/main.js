

function updateWeatherDataFromServer() {
  axios({
    method: 'POST',
    url: 'http://localhost:8080/searchWeather',
  })
    .then((res) => {
      // Whenever we get the weather data, we can modify the DOM with new data
      document.getElementById('myclientdata').innerHTML = res.location.country;
    })
    .catch(err => console.log(err))
}

updateWeatherDataFromServer();
