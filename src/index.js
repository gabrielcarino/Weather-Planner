document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-form").addEventListener("submit", () => {

  })
})
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