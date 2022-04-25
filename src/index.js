document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const zip = e.target.zip.value;
    const prefTemp = e.target.temp.value;
    const date = e.target.date.value;
    fetchGeoCode(zip, date, prefTemp)
    e.target.reset();
  });
  const fetchGeoCode = function (zip, date, temp) {
    // fetch(/*some geocode api that's hopefully free*/)
    //   .then(/*covert to json*/)
    //   .then(/*call fetchWeather(lon,lat)*/)
    //   .catch(/*return error message*/)

    //temporary test parameters:
    fetchWeather(-87.789000, 41.869780, date, temp);
  };
  const fetchWeather = function (lon, lat, date, temp) {
    const usableDate = parseInt(date.slice(0,4) + date.slice(5,7) + date.slice(8))
    fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`)
      .then(resp => resp.json())
      .then(resp => {
        let targetDate = resp.dataseries.find(day => {
          return day.date === usableDate;
        });
        let weekForecast = resp.dataseries;
        weekForecastCard(weekForecast);
        dayForecastCard(targetDate, temp);
      })
  };
  const weekForecastCard = function (forecastData) {

  };
  const dayForecastCard = function (targetDate, prefTemp) {

  };
});
/*
  plan:
  convert zipcode to geocode using google's api
  take geocode and input to 7Timer api 
  fetch weather info and return forecast 
  take forecast and append to HTML:
  make current day forecast card with plan for the day
  7-day forecast below it 

  for plan: return suggestions for clothing to wear depending on forecast 
  compared to preffered temperature.

  psuedocode:
  fetch GET from google api: longitude and latitude of zipcode input
  fetch GET from 7Timer api: civil light data of longitude and latitude
  change background appearance to match weather for the day
  update forecast card to display today's forecast
  if input date != today's date display that date's forecast card first
  update 7-day forecast card to display 7-day forecast
  if forecast high > preffered temp, wear cool clothes
  if forecast high > preffered temp && low < preffered temp bring layers
  if forecast rain > bring umbrella, windbreaker or rain coat depending on temp
  if forecast 
*/