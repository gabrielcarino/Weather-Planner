document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const lat = e.target.lat.value;
    const lon = e.target.lon.value;
    const date = e.target.date.value;
    fetchWeather(lon, lat, date)
    //fetchGeoCode(zip, date)
    e.target.reset();
  });
/*
  const fetchGeoCode = function (zip, date) {
    fetch(some geocode api that's hopefully free)
      .then(covert to json)
      .then(call fetchWeather(lon,lat))
      .catch(return error message)
    fetchWeather(-87.789000, 41.869780, date);
  };
*/
  const fetchWeather = function (lon, lat, date) {
    const usableDate = parseInt(date.slice(0,4) + date.slice(5,7) + date.slice(8))
    fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`)
      .then(resp => resp.json())
      .then(resp => {
        let targetDate = resp.dataseries.find(day => {
          return day.date === usableDate;
        });
        let weekForecast = resp.dataseries;
        weekForecastCard(weekForecast);
        dayForecastCard(targetDate);
      })
  };
  const weekForecastCard = function (forecastData) {
    if (document.querySelectorAll(".mini-forecast")) {
      document.querySelectorAll(".mini-forecast").forEach(el => el.remove());
    };
    const forecastCard = document.getElementById("7-day-forecast");
    document.getElementById("container").classList.remove("hidden");
    document.getElementById("input-form").classList.add("hidden");
    document.getElementById("new-plan").classList.remove("hidden");
    forecastData.forEach(day => {
      const miniForecastCard = document.createElement("div");
      forecastCard.append(miniForecastCard);
      miniForecastCard.className = "mini-forecast"
      miniForecastCard.innerHTML = 
        `<h3>${day.date.toString().slice(4,6)}/${day.date.toString().slice(6)}</h3>
        <h3 class=${day.weather}>${day.weather}</h3>
        <h3>High of ${(day.temp2m.max*(9/5)+32).toFixed(0)}</h3>
        <h3>Low of ${(day.temp2m.min*(9/5)+32).toFixed(0)}</h3>
        <h3 class=${day.wind10m_max}></h3>`;
    })
  };
  const dayForecastCard = function (targetDate) {
    const planContainer = document.getElementById("plan-container");
    if (document.querySelector(".forecast-card")) {
      planContainer.innerHTML = "";

    };
    const forecastCard = document.createElement("div");
    planContainer.append(forecastCard);
    forecastCard.className = "forecast-card"
    forecastCard.innerHTML = 
    `<h3>${targetDate.date.toString().slice(4,6)}/${targetDate.date.toString().slice(6)}</h3>
    <h3 class=${targetDate.weather}>${targetDate.weather}</h3>
    <h3>High of ${(targetDate.temp2m.max*(9/5)+32).toFixed(0)}°F</h3>
    <h3>Low of ${(targetDate.temp2m.min*(9/5)+32).toFixed(0)}°F</h3>
    <h3 class=${targetDate.wind10m_max}></h3>`;
    const planCard = document.createElement("div");
    planContainer.append(planCard);
    planCard.className = "plan-card";
    fetch("http://localhost:3000/tempRecs")
      .then(resp => resp.json())
      .then(resp => console.log(resp));
    planCard.innerHTML = `
    <div>
      <h3>Clothing</h3>
      <p></p>
    </div>`
    fetch("http://localhost:3000/weatherRecs")
      .then(resp => resp.json())
      .then(resp => console.log(resp));
    `<div>
      <h3>Gear</h3>
      <p></p>
    </div>`;
    readable();
  };
  //make displayed data readable
  const readable = function () {
    //wind speeds
    Array.from(document.getElementsByClassName("1")).forEach(el => el.innerHTML = "No Wind");
    Array.from(document.getElementsByClassName("2")).forEach(el => el.innerHTML = "Winds up to 5mph");
    Array.from(document.getElementsByClassName("3")).forEach(el => el.innerHTML = "Winds up to 15mph");
    Array.from(document.getElementsByClassName("4")).forEach(el => el.innerHTML = "Winds up to 25mph");
    Array.from(document.getElementsByClassName("5")).forEach(el => el.innerHTML = "Winds up to 40 mph");
    Array.from(document.getElementsByClassName("6")).forEach(el => el.innerHTML = "Winds up to 55mph");
    Array.from(document.getElementsByClassName("7")).forEach(el => el.innerHTML = "Winds up to 75mph");
    Array.from(document.getElementsByClassName("8")).forEach(el => el.innerHTML = "Hurrican or Tornado Likely");
    //weather states
    Array.from(document.getElementsByClassName("pcloudy")).forEach(el => el.innerHTML = "part. cloud");
    Array.from(document.getElementsByClassName("mcloudy")).forEach(el => el.innerHTML = "most. cloudy");
    Array.from(document.getElementsByClassName("lightrain")).forEach(el => el.innerHTML = "light rain");
    Array.from(document.getElementsByClassName("oshower")).forEach(el => el.innerHTML = "occ. rain");
    Array.from(document.getElementsByClassName("ishower")).forEach(el => el.innerHTML = "iso. rain");
    Array.from(document.getElementsByClassName("lightsnow")).forEach(el => el.innerHTML = "light snow");
    Array.from(document.getElementsByClassName("rainsnow")).forEach(el => el.innerHTML = "sleet");
  }
  document.getElementById("new-plan").addEventListener("click", () => {
    document.getElementById("input-form").classList.remove("hidden");
    document.getElementById("new-plan").classList.add("hidden"); 
  })
});
/*
  plan:
  convert zipcode to geocode using google's api
  t̶a̶k̶e̶ g̶e̶o̶c̶o̶d̶e̶ a̶n̶d̶ i̶n̶p̶u̶t̶ t̶o̶ 7̶T̶i̶m̶e̶r̶ a̶p̶i̶ 
  f̶e̶t̶c̶h̶ w̶e̶a̶t̶h̶e̶r̶ i̶n̶f̶o̶ a̶n̶d̶ r̶e̶t̶u̶r̶n̶ f̶o̶r̶e̶c̶a̶s̶t̶ 
  t̶a̶k̶e̶ f̶o̶r̶e̶c̶a̶s̶t̶ a̶n̶d̶ a̶p̶p̶e̶n̶d̶ t̶o̶ H̶T̶M̶L̶:̶
  m̶a̶k̶e̶ c̶u̶r̶r̶e̶n̶t̶ d̶a̶y̶ f̶o̶r̶e̶c̶a̶s̶t̶ c̶a̶r̶d̶ with plan for the day
  7̶-̶d̶a̶y̶ f̶o̶r̶e̶c̶a̶s̶t̶ b̶e̶l̶o̶w̶ i̶t̶ 

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