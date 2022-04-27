# Weather Planner

Weather Planner is a JavaScript web app for planning out your day accroding to the weather.

## Description 

Using the 7Timer! API, and some user input data, Weather Planner will suggest what sorts of clohting to wear, and what kinds of things you should bring with you for your day.

The user inputs their location as a zipcode or coordinates(in latitude and longitude) if the specified zipcode is not found in the database, and the date which they would like to plan for. After given that information, Weather Planner will update the DOM to display suggestions of what clothing would be ideal for these weather conditions and what gear you might want to bring along, alongside the forecast of the planned date. Below that, the user can find a 7 day forecast starting on the current date.

## Visuals

![image of webpage with inital input form](/images/visual1.png)
![image of webpage with alternate input form](/images/visual2.png)
![image of webpage after input is submitted](/images/visual3.png)

## Usage

When given a location in the form of a zipcode or coordinates, and a date that is valid for that location(date must fall between the current date at that location and the date 6 days from then. ie: Today is 04/27/2022, the input date could be any date from 04/27/2022-05/03/2022), the DOM will be updated to display pertenant information about that locations weather for the following 7 days and what to wear/bring on the selected date.

