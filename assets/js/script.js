

const currentTime = moment().format('dddd, MMMM Do YYYY');
// //var citySearch = cityNameEl.value;
// const currentTempEl = document.querySelector("#daily-temp");
// const currentHumEl = document.querySelector("#daily-humidity");
// const currentWindEl = document.querySelector("#daily-wind");
// const currentCityDateIconEl = document.querySelector("#city-date-icon");
// const currentWeatherIcon = document.querySelector("#now-icon");


console.log(currentTime);
//const apiKey = "18eafa00225477a564d0471bb75359e9";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=18eafa00225477a564d0471bb75359e9&units=metric";




//create function to get search value, save value of search field, 
//getSearchValue function



//fetch call for current weather 
function getCurrentWeather(event) {
    event.preventDefault();    
    console.log("this is working");

    var cityNameEl = document.querySelector("#cityName").value;   
    cityWeather(cityNameEl);
};

function cityWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=18eafa00225477a564d0471bb75359e9&units=imperial")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);        
        displayTodayWeather(data);
        fiveDayForecast(city);
    })
    .catch(err => console.log(err));

}

function displayTodayWeather(data) {
    var currentWeather = document.querySelector("#daily-conditions")
    currentWeather.innerHTML = "";
    var currentTempLi = document.createElement("li");
    currentTempLi.textContent = data.main.temp;
    var currentHumidityLi = document.createElement("li");
    currentHumidityLi.textContent = data.main.humidity;
    var currentWindLi = document.createElement("li");
    currentWindLi.textContent = data.wind.speed;
    var currentWeatherContainer = document.querySelector("#daily-conditions");
    currentWeatherContainer.appendChild(currentTempLi);
    currentWeatherContainer.appendChild(currentHumidityLi);
    currentWeatherContainer.appendChild(currentWindLi);

};




function fiveDayForecast(cityNameEl) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameEl + "&appid=18eafa00225477a564d0471bb75359e9" )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        for (let i = 0; i < data.list.length; i++)  {
            //TA Symone Varnado went over this with me( this loops through the api data array
            // for the five day forecast which iterates at 3 hrs intervals for 5 days and only catches every day at 3pm(15:00:00) )
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                
            }

        }
        // let fiveDay = document.querySelector("#five-day")
    })
    
           

};

document.querySelector("#search-button").addEventListener("click", getCurrentWeather);






//display current weather

// var getCityWeather = function(citySearch) {
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`;
//     fetch(apiUrl)
//         .then(function(response) {
//             console.log(response)
//         //     if (response.ok){
//         //         response.json().then(function(data) {
//         //             console.log(data);
//         //         });
//         //     } else {
//         //         alert("error: " + response.statusText);   
//         //     }
//         // })
//         // .catch(function(error) {
//         //     msg.textContent = "Please search for a valid city";
//         });   
// };

//Api key from openweather: 18eafa00225477a564d0471bb75359e9



