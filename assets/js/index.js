"use strict";

const api = {
  key: "58c94e199c4cdf56dc8dce312ac1d27b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.getElementById("search");
const btn = document.getElementById("btn-search");
const error = document.getElementById("error");
const city = document.getElementById("city");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const tempRange = document.getElementById("tempRange");
const weatherIcon = document.getElementById("weatherIcon");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.type == "click") {
    getData();
    console.log(search.value);
  }
});

// FETCH THE API
function getData() {
  fetch(`${api.base}weather?q=${search.value}
    &units=metric&appid=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayData);
}

function displayData(response) {
  console.log(response);
  // IF WE GET AN ERROR CLEAN THE INPUT FIELD AND SHOW ERROR MSG
  if (response.cod === "404" || search.value === "") {
    error.textContent = "Please enter a valid location!";
    search.value = "";
    // IF ITS A SUCCESS CLEAN THE FIELD AND SHOW RESULT
  } else {
    search.value = "";
    error.textContent = "";
    // CITY
    city.innerText = `${response.name}, ${response.sys.country}`;
    // DATE
    const today = new Date();
    date.innerText = dateFunction(today);

    // MAIN TEMP
    temp.innerHTML = `
             <h3 style="display: flex">
              ${Math.round(
                response.main.temp
              )} <span class="box__degree">&#8451;</span>
             </h3>
             <h3 style="display: flex">
             ${Math.round(
               (response.main.temp * 9) / 5 + 32
             )} <span class="box__fahrenheit">&#8457;</span>
             </h3>`;

    // ICON
    const iconURL = "http://openweathermap.org/img/wn/";
    weatherIcon.src = iconURL + response.weather[0].icon + ".png";
    weather.innerText = `Weather: ${response.weather[0].main}`;
    tempRange.innerHTML = `
             <div id="tempRange" class="box__range">
            <span>${Math.round(response.main.temp_min)} &#8451; / ${Math.round(
      response.main.temp_max
    )} &#8451;</span>
            <span>${Math.round(
              (response.main.temp_min * 9) / 5 + 32
            )} &#8457; / ${Math.round(
      (response.main.temp_max * 9) / 5 + 32
    )} &#8457;</span>
          </div>`;
  }
}

function dateFunction(d) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aut",
    "Sep",
    "OCt",
    "Nov",
    "Dec",
  ];

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date}, ${month}, ${year}`;
}
