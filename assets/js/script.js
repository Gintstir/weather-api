
var cityFormEl = document.querySelector("#city-search");
//var for input element
var cityNameEl = document.querySelector("#cityName");
var searchBtn = document.querySelector(".btn");
//var citySearch = cityNameEl.value;

//const apiKey = "18eafa00225477a564d0471bb75359e9";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=18eafa00225477a564d0471bb75359e9&units=metric";

cityFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    let citySearch = cityName.value.trim();
    console.log(citySearch);
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=18eafa00225477a564d0471bb75359e9&units=metric")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);        
    })
});

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



