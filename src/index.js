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
      miniForecastCard.className = "mini-forecast";
      miniForecastCard.id = `${day.weather}`;
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
    forecastCard.className = "forecast-card";
    forecastCard.id = `${targetDate.weather}`
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
      .then(suggestions => {
        const clothes = document.createElement("div");
        planCard.append(clothes);
        if (targetDate.temp2m.max < -5 /*23°F*/) {
          const tempRec = suggestions.find(rec => {
            return rec.id === 0
          })
          clothes .innerHTML = `
        <h3>Clothing</h3>
        <ul>
          <li>Top:${tempRec.top}</li>
          <li>Bottom:${tempRec.bottom}</li>
          <li>Shoes:${tempRec.shoes}</li>
        </ul>`
        }
        else if (targetDate.temp2m.max < 5 /*42°F*/) {
          const tempRec = suggestions.find(rec => {
            return rec.id === 1
          })
          clothes .innerHTML = `
        <h3>Clothing</h3>
        <ul>
          <li>Top:${tempRec.top}</li>
          <li>Bottom:${tempRec.bottom}</li>
          <li>Shoes:${tempRec.shoes}</li>
        </ul>`
        }
        else if (targetDate.temp2m.max < 15 /*59°F*/) {
          const tempRec = suggestions.find(rec => {
            return rec.id === 2
          })
          clothes .innerHTML = `
        <h3>Clothing</h3>
        <ul>
          <li>Top:${tempRec.top}</li>
          <li>Bottom:${tempRec.bottom}</li>
          <li>Shoes:${tempRec.shoes}</li>
        </ul>`
        }
        else if (targetDate.temp2m.max < 25 /*77°F*/) {
          const tempRec = suggestions.find(rec => {
            return rec.id === 3
          })
          clothes .innerHTML = `
        <h3>Clothing</h3>
        <ul>
          <li>Top:${tempRec.top}</li>
          <li>Bottom:${tempRec.bottom}</li>
          <li>Shoes:${tempRec.shoes}</li>
        </ul>`
        }
        else if (targetDate.temp2m.max < 30 /*86°F*/) {
          const tempRec = suggestions.find(rec => {
            return rec.id === 4
          })
          clothes .innerHTML = `
        <h3>Clothing</h3>
        <ul>
          <li>Top:${tempRec.top}</li>
          <li>Bottom:${tempRec.bottom}</li>
          <li>Shoes:${tempRec.shoes}</li>
        </ul>`
        }
        else if (targetDate.temp2m.max < 35 /*95°F*/) {
          const tempRec = suggestions.find(rec => {
            return rec.id === 5
          })
          clothes .innerHTML = `
        <h3>Clothing</h3>
        <ul>
          <li>Top:${tempRec.top}</li>
          <li>Bottom:${tempRec.bottom}</li>
          <li>Shoes:${tempRec.shoes}</li>
        </ul>`
        }
        else if (targetDate.temp2m.max >=35 /*95°F or above*/) {
          const tempRec = suggestions.find(rec => {
            return rec.id === 6
          })
          clothes .innerHTML = `
        <h3>Clothing</h3>
        <ul>
          <li>Top:${tempRec.top}</li>
          <li>Bottom:${tempRec.bottom}</li>
          <li>Shoes:${tempRec.shoes}</li>
          <li>${tempRec.beach}</li>
        </ul>`
        }
      });
    fetch("http://localhost:3000/weatherRecs")
      .then(resp => resp.json())
      .then(suggestions => {
        const gearEl = document.createElement("div");
        planCard.append(gearEl);
        const weatherRec = suggestions.find(rec => {
          return rec.weather === targetDate.weather;
        })
        gearEl.innerHTML = `
        <h3>Gear</h3>`;
        const gearList = document.createElement("ul");
        gearEl.append(gearList);
        weatherRec.gear.forEach(i => {
          const gearItem = document.createElement("li");
          gearList.append(gearItem);
          gearItem.innerText = i
        })
      });
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
  document.getElementById("red-btn").addEventListener("mouseover", () => {
    alert("Don't you do it!");
  });
  document.getElementById("red-btn").addEventListener("click", () => {
    alert("Now look what you did!");
    document.querySelector("body").innerHTML = '';
  });
});