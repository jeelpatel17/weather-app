// let city = document.getElementById("city");
// let temperature = document.getElementById("temperature");
// let illustration = document.getElementById("illustration");
// let cityInp = document.getElementById("cityInp");
// let searchBtn = document.getElementById("searchBtn");
// let detectLocationBtn = document.getElementById("detectLocation");

// // TO FETCH WEATHER ON USER INPUT
// async function fetchWeather() {
//   city.innerText = "Loading...";
//   if (cityInp.value.length > 0) {
//     let res = await fetch(
//       `http://api.weatherapi.com/v1/current.json?key=668949dd979940159ad134351222701&q=${cityInp.value}`
//     );
//     const data = await res.json();
//     //   console.log(data);
//     city.innerText =
//       data.location.name == data.location.region
//         ? data.location.name
//         : `${data.location.name}, ${data.location.region}`;
//     temperature.innerHTML = `${data.current.temp_c}&#176;C`;
//     illustration.setAttribute("src", data.current.condition.icon);
//     cityInp.value = "";
//   }
// }
// searchBtn.addEventListener("click", fetchWeather);

// // TO FETCH WEATHER ACCORDING TO THE USER'S LOCATION
// detectLocationBtn.addEventListener("click", geoFindMe);

// function geoFindMe() {
//   const loca = document.getElementById("city");

//   // AS A FALLBACK, IF A DEVICE BROWSER ISN'T UPDATED AND DOESN'T HAVE GEOLOCATION API FEATURE
//   if (!navigator.geolocation) {
//     loca.textContent = "Geolocation is not supported by your browser";
//   } else {
//     loca.textContent = "Locating…";
//     navigator.geolocation.getCurrentPosition(success, error);
//   }

//   // FETCHING THE LOCATION NAME ACCORDING TO ITS LATITUDE & LONGITUDE
//   let city, region;
//   async function displayLocation(latitude, longitude) {
//     let res = await fetch(
//       `https://www.mapquestapi.com/geocoding/v1/reverse?key=p4p9uAgWrN1oEVr6BOCGuZWKNreSAY63&location=${latitude}%2C${longitude}&outFormat=json&thumbMaps=false`
//     );
//     let data = await res.json();
//     city = data.results[0].locations[0].adminArea5;
//     region = data.results[0].locations[0].adminArea3;
//     loca.textContent = `${city}, ${region}`;
//   }

//   // PASSING SUCCESS AND ERROR FUNCTIONS IN GEOLOCATION API
//   function success(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     displayLocation(latitude, longitude);
//   }
//   function error() {
//     loca.textContent = "Unable to retrieve your location";
//   }
// }

var successHandler = function (position) {
  alert(position.coords.latitude);
  alert(position.coords.longitude);
};

var errorHandler = function (errorObj) {
  alert(errorObj.code + ": " + errorObj.message);

  alert("something wrong take this lat " + position.coords.latitude);

  alert("something wrong take this lng " + position.coords.latitude);
};

navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
  enableHighAccuracy: true,
  maximumAge: 10000,
});
