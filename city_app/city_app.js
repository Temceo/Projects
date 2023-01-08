"use strict";
// APP THAT COLLECTS API DATA ON SOUTH AFRICAN CITY AND DISPLAYS SELECTED DATA

// Assign to variable the input field used to type in letters
const $ = (selector) => document.querySelector(selector);
let inputValue = $("#city-input");

// Array of South African cities (displayed in dropdown list)
const southAfricanCities = [
  "Alice",
  "Butterworth",
  "East London",
  "Graaff-Reinet",
  "Grahamstown",
  "King William's Town",
  "Mthatha",
  "Port Elizabeth",
  "Queenstown",
  "Uitenhage",
  "Zwelitsha",
  "Bethlehem",
  "Bloemfontein",
  "Kroonstad",
  "Odendaalsrus",
  "Parys",
  "Phuthaditjhaba",
  "Sasolburg",
  "Virginia",
  "Welkom",
  "Benoni",
  "Boksburg",
  "Brakpan",
  "Carletonville",
  "Germiston",
  "Johannesburg",
  "Krugersdorp",
  "Pretoria",
  "Randburg",
  "Randfontein",
  "Roodepoort",
  "Soweto",
  "Springs",
  "Vanderbijlpark",
  "Vereeniging",
  "Durban",
  "Empangeni",
  "Ladysmith",
  "Newcastle",
  "Pietermaritzburg",
  "Pinetown",
  "Ulundi",
  "Umlazi",
  "Giyani",
  "Lebowakgomo",
  "Musina",
  "Phalaborwa",
  "Polokwane",
  "Seshego",
  "Sibasa",
  "Thabazimbi",
  "Emalahleni",
  "Nelspruit",
  "Secunda",
  "Klerksdorp",
  "Mahikeng",
  "Mmabatho",
  "Potchefstroom",
  "Rustenburg",
  "Kimberley",
  "Kuruman",
  "Port Nolloth",
  "Cape Town",
  "Constantia",
  "George",
  "Hopefield",
  "Oudtshoorn",
  "Paarl",
  "Simon's Town",
  "Stellenbosch",
  "Swellendam",
  "Worcester",
];

// Sort cities in descending order
let sortedCities = southAfricanCities.sort();

// Event listener to listen for when user stops typing
inputValue.addEventListener("keyup", inputChange);

// Function to filter cities based on user input
function inputChange() {
  removeDropDown();
  const filteredCities = [];
  const value = inputValue.value.toLowerCase();
  sortedCities.filter((city) => {
    if (city.substring(0, value.length).toLowerCase() === value) {
      filteredCities.push(city);
    }
  });

  // Runs function to show filtered cities (based on letters typed by user)
  autoCompleteDropDown(filteredCities);
}

// Function that displays filtered cities on web page
function autoCompleteDropDown(list) {
  const ulElement = document.createElement("ul");
  ulElement.className = "autocomplete-list";
  ulElement.id = "autocomplete-list";

  list.forEach((city) => {
    const listItem = document.createElement("li");
    // Event listener to listen for user click on chosen city
    listItem.addEventListener("click", onListItemClick);
    listItem.innerHTML = city;
    ulElement.appendChild(listItem);
  });
  document.querySelector("#input-area").appendChild(ulElement);
}

// Function to clear dropdown list of existing data (run each time a new city is chosen)
function removeDropDown() {
  const ulElement = document.querySelector("#autocomplete-list");
  if (ulElement) ulElement.remove();
}

// Functions that stores the user's chosen city (when they click on it)
function onListItemClick(e) {
  e.preventDefault();
  const newValue = e.target;
  inputValue.value = "";
  inputValue.value = newValue.innerHTML;
  const value = inputValue.value.trim();
  getcityDetails(value);
  removeDropDown();
}

// Async await function to get city / weather details.  The chosen city is passed into it
async function getcityDetails(city) {
  if (city === "") return;
  removeCityInfo();
  // Array to hold city, population, elevation and temperature details
  const cityData = [city];
  const options = {
    method: "GET",
    headers: {
      // "X-RapidAPI-Key": "1e760c5f2amsh4e3f9859b837bb4p1f5803jsn68415bb3b4b0",
      "X-RapidAPI-Key": "6982ca2098msh6ace13d6bd5e4cfp154abejsna206e043eba8",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    // Getting city details from first api
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=za&namePrefix=${city}`,
      options
    );
    const data = await response.json();
    const options2 = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1e760c5f2amsh4e3f9859b837bb4p1f5803jsn68415bb3b4b0",
        "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
      },
    };
    // Getting city coordinates from first api and passing them to second api in order to get weather details for that city
    const coordinates = getCityData(data, cityData);
    const weather = await fetch(
      `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${coordinates[0].toString()}&lat=${coordinates[1].toString()}`,
      options2
    );
    const weatherData = await weather.json();
    // Running function to get weather data and pass on to cityData array
    getWeatherData(weatherData, cityData);
    // Running function to display city data on web page
    printCityInfo(cityData);
  } catch (error) {
    console.log(error);
  }
}

// Function to get city data. Returns longitude and latitude to be passed on to second api
function getCityData(data, cityData) {
  console.log(data);
  if (data.data.length > 1) {
    cityData.push(data.data[1].population);
    return [data.data[1].longitude, data.data[1].latitude];
  } else {
    cityData.push(data.data[0].population);
    return [data.data[0].longitude, data.data[0].latitude];
  }
}

// Function to get city weather data and pass it on to cityData array
function getWeatherData(weatherData, cityData) {
  cityData.push(weatherData.data[0].elev_angle);
  cityData.push(weatherData.data[0].app_temp);
}

// Function to print city data onto web page
function printCityInfo(cityData) {
  const info = `
  <li>City: ${cityData[0]}</li>
  <li>Population: ${
    cityData[1] === 0 || cityData[1] === undefined
      ? "Not given"
      : cityData[1].toLocaleString("en")
  }</li>
  <li>Elevation: ${cityData[2] === undefined ? "Not given" : cityData[2]}</li>
  <li>Temperature: ${
    cityData[3] === undefined ? "Not given" : cityData[3]
  }&#8451;</li>
  `;
  document.querySelector("#display-data").insertAdjacentHTML("beforeend", info);
}

// Function to clear existing city data out of ul (run every time a new city is chosen)
function removeCityInfo() {
  let ulElement = document.querySelector("#display-data");
  ulElement.innerHTML = "";
}
