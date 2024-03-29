let city = document.getElementById("city");
let body = document.getElementById("body");
let heading = document.getElementById("heading");
let weatherInfo = document.getElementById("weatherInfo");
let temperature = document.getElementById("temperature");
let illustration = document.getElementById("illustration");
let cityInp = document.getElementById("cityInp");
let results = document.getElementById("result");
let searchBtn = document.getElementById("searchBtn");
let detectLocationBtn = document.getElementById("detectLocation");
let weatherCodes = {
  sunny: [113],
  wind: [227],
  storm: [200, 230],
  clouds: [248, 122, 116, 143, 119],
  rain: [
    185, 176, 308, 305, 302, 299, 296, 293, 284, 281, 266, 263, 260, 389, 386,
    359, 356, 353, 314, 311,
  ],
  snow: [
    395, 392, 182, 179, 350, 338, 335, 332, 329, 326, 323, 320, 317, 377, 374,
    371, 368, 365, 362,
  ],
};

// TO FETCH WEATHER ON USER INPUT
async function fetchWeather(e) {
  e.preventDefault();
  results.innerHTML = "";
  weatherInfo.style.display = "flex";
  city.innerText = "Loading...";
  if (cityInp.value.length > 0) {
    let req;
    req = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=fe4faa93b1ac442384a121612220602&q=${cityInp.value}&aqi=no`
    );
    const res = await req.json();
    if (res.error) {
      city.innerText = `City not found! :(`;
      return 1;
    }
    const geoData = res.location;
    const weatherData = res.current;
    console.log(`fetched weather`, res);
    city.innerText =
      geoData.region.length > 0
        ? `${geoData.name}, ${geoData.region}, ${geoData.country}`
        : `${geoData.name}, ${geoData.country}`;
    temperature.innerHTML = `${weatherData.temp_c}&#176;C <span id="feelsLike">(Feels like ${weatherData.feelslike_c}&#176;C)</span>`;
    cityInp.value = "";
    // Displaying illustration according to the weather code
    for (let key in weatherCodes) {
      let value = weatherCodes[key];
      for (code of value) {
        if (code == weatherData.condition.icon.slice(-7, -4)) {
          // Changing the illustration displayed and overall site theme according to the weather
          illustration.setAttribute("src", `./assets/img/${key}.png`);
          body.style.backgroundImage = `var(--${key})`;
          body.style.color = `var(--primary-bg)`;
          if (!body.classList.contains("animateBg")) {
            body.classList.add("animateBg");
          }
          searchBtn.style.backgroundColor = `var(--${key}-bg)`;
          searchBtn.style.borderColor = `#fff`;
          detectLocationBtn.style.borderColor = `#fff`;
          detectLocationBtn.style.color = `#fff`;
          heading.classList.remove("clip");
        }
      }
    }
  }
  // If someone doesn't enter a city name
  else {
    city.innerText = "Please enter a city name first!";
    illustration.removeAttribute("src");
    temperature.textContent = "";
    setTimeout(() => {
      weatherInfo.style.display = "none";
    }, 3000);
  }
}

async function autoComplete() {
  results.style.display = "flex";
  if (cityInp.value.length > 0) {
    let req = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=fe4faa93b1ac442384a121612220602&q=${cityInp.value}`
    );
    const res = await req.json();
    results.innerHTML = "";
    res.forEach((e, i) => {
      results.innerHTML += `<option class="cityNames">${e.name}, ${e.country}</option>`;
    });
    // Attaching an event listener on every <li> element so that the user can click on it and to select it to check its weather
    Array.from(document.getElementsByClassName("cityNames")).forEach((e) =>
      e.addEventListener("click", () => {
        cityInp.value = e.textContent;
        results.innerHTML = "";
      })
    );
  } else {
    results.innerHTML = "";
    results.style.display = "none";
  }
}

searchBtn.addEventListener("click", fetchWeather);
// Everytime the user types something, it'll return the potential city names that use may want to check the weather of
cityInp.addEventListener("input", autoComplete);

// TO FETCH WEATHER ACCORDING TO THE USER'S LOCATION
detectLocationBtn.addEventListener("click", geoFindMe);

function geoFindMe() {
  cityInp.value = "";
  const loca = document.getElementById("city");
  weatherInfo.style.display = "flex";
  // AS A FALLBACK, IF A DEVICE BROWSER ISN'T UPDATED AND DOESN'T HAVE GEOLOCATION API FEATURE
  if (!navigator.geolocation) {
    loca.textContent = "Geolocation is not supported by your browser";
  } else {
    loca.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // FETCHING THE LOCATION NAME ACCORDING TO ITS LATITUDE & LONGITUDE
  let displayCity, displayRegion;
  async function displayLocation(latitude, longitude) {
    let res = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/reverse?key=p4p9uAgWrN1oEVr6BOCGuZWKNreSAY63&location=${latitude}%2C${longitude}&outFormat=json&thumbMaps=false`
    );
    let data = await res.json();
    displayCity = data.results[0].locations[0].adminArea5;
    displayRegion = data.results[0].locations[0].adminArea3;
    // PASSING THE NAME TO THE WEATHER API
    let reqWeather = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=fe4faa93b1ac442384a121612220602&q=${displayCity}&aqi=no`
    );
    const resWeather = await reqWeather.json();
    console.log(`located weather`, resWeather);
    // console.log(resWeather);
    const myGeoData = resWeather.location;
    const myWeatherData = resWeather.current;
    city.innerText =
      myGeoData.region.length > 0
        ? `${myGeoData.name}, ${myGeoData.region}, ${myGeoData.country}`
        : `${myGeoData.name}, ${myGeoData.country}`;

    temperature.innerHTML = `${myWeatherData.temp_c}&#176;C <span id="feelsLike">(Feels like ${myWeatherData.feelslike_c}&#176;C)</span>`;

    for (let key in weatherCodes) {
      let value = weatherCodes[key];
      for (code of value) {
        if (code != myWeatherData.condition.icon.slice(-7, -4)) {
          illustration.setAttribute("src", `./assets/img/default.png`);
        } else {
          illustration.setAttribute("src", `./assets/img/${key}.png`);
          detectLocationBtn.style.borderColor = `#fff`;
          detectLocationBtn.style.color = `#fff`;
          heading.classList.remove("clip");
          body.style.backgroundImage = `var(--${key})`;
          body.style.color = `var(--primary-bg)`;
          if (!body.classList.contains("animateBg")) {
            body.classList.add("animateBg");
          }
          searchBtn.style.backgroundColor = `var(--${key}-bg)`;
          searchBtn.style.borderColor = `#fff`;
          return;
        }
      }
    }
  }

  // PASSING SUCCESS AND ERROR FUNCTIONS IN GEOLOCATION API
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    displayLocation(latitude, longitude);
  }
  function error() {
    loca.textContent = "Unable to retrieve your location";
  }
}
