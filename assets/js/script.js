

const currentTime = moment().format('dddd, MMMM Do YYYY');
//console.log(currentTime);
const searchedCityList = document.querySelector("#cityContainer");



//const apiKey = "18eafa00225477a564d0471bb75359e9";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=18eafa00225477a564d0471bb75359e9&units=metric";
loadEventListeners();


function loadEventListeners() {

    //Load saved cities section
    document.addEventListener('DOMContentLoaded', getCities);
    
    //get current weather and 5 day forecast
    document.querySelector("#search-button").addEventListener("click", getCurrentWeather);
    
}

//get cities from Local Storage and display 
function getCities() {
    let cities;
    if(localStorage.getItem('cities') === null) {
        cities = [];
    } else {
        cities = JSON.parse(localStorage.getItem('cities'));
    }

    cities.forEach(function(city){
        // Create li element
        const cityList = document.createElement('li');
        // Add class
        cityList.className = 'cityContainer-item list-group-item';
        // Create text node and append to li
        cityList.appendChild(document.createTextNode(city));
        // Create new link element
        const cityLink = document.createElement('a');
        // Add class
        cityLink.className = 'delete-item secondary-content';
        // Add icon html
        //link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        cityList.appendChild(cityLink);

        // Append li to ul
        searchedCityList.appendChild(cityList);
    });    
}




//get value from search bar
function getCurrentWeather(event) {
    event.preventDefault();    
    //console.log("this is working");

    var cityNameEl = document.querySelector("#cityName").value;   
    cityWeather(cityNameEl);

    //set to local storage
    // localStorage.setItem('city', cityNameEl);

    //store in LS
    storeCityInLocalStorage(cityNameEl);
};


//store city
function storeCityInLocalStorage(city) {
    let cities;
    if(localStorage.getItem('cities') === null) {
        cities = [];
    } else {
        cities = JSON.parse(localStorage.getItem('cities'));
    }

    cities.push(city);

    localStorage.setItem('cities', JSON.stringify(cities));
}



// document.querySelector("#cityName").addEventListener("submit", function(event) {
//     //const saveCity
//     console.warn(123);
//     event.preventDefault
// });





// const cityName = localStorage.getItem('city');
// console.warn();
// function displaySavedCities() {


//     if(localStorage.getItem('city')) {
//         var savedCity = document.createElement("a");

//         savedCity.textContent = cityNameEl.value;

//         var savedCityContainer = document.querySelector("#formContainer").append(savedCity);
//     }
// };


//store searched cities




//fetch call for current weather
function cityWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=18eafa00225477a564d0471bb75359e9&units=imperial")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //console.log(data);        
        displayTodayWeather(data);
        fiveDayForecast(city);
        //displaySavedCities();
        
       //currentUvIndex(city);
    })
    .catch(err => console.log(err));

}


//display current weather
function displayTodayWeather(data) {
    
    //weather icon    
    var currentIcon = document.querySelector("#dailyIcon");
    currentIcon.innerHTML = "";
    var currentWeatherIcon = data.weather[0].icon;
    var currentWeatherImage = document.createElement("img");
    currentWeatherImage.setAttribute("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");
    currentIcon.appendChild(currentWeatherImage);

    //City name and date
    var currentWeatherCityDate = document.querySelector("#dailyWeather");
    currentWeatherCityDate.innerHTML = "";
    var currentCityDate = document.createElement("h4");
    currentCityDate.textContent = (data.name + " " + "(" + currentTime + ")");
    currentWeatherCityDate.appendChild(currentCityDate);
    
    //temp, humidity, wind, and uv index
    var currentWeather = document.querySelector("#daily-conditions");
    currentWeather.innerHTML = "";
    // var currentCityDateIcon = document.createElement("li");
    // currentCityDateIcon.textContent = (data.name + " " + currentTime); 
    // console.log(currentCityDateIcon);
    var currentTempLi = document.createElement("p");
    currentTempLi.textContent = ("Temp: " + data.main.temp + "°F");
    var currentHumidityLi = document.createElement("p");
    currentHumidityLi.textContent = ("Humidity: " + data.main.humidity + "%");
    var currentWindLi = document.createElement("p");
    currentWindLi.textContent = ("Wind Speed: " + data.wind.speed + "mph");
     currentUvIndex(data);
  

    //var currentWeatherContainer = document.querySelector("#daily-conditions");

    
    //currentWeather.appendChild(currentCityDateIcon);
    currentWeather.appendChild(currentTempLi);
    currentWeather.appendChild(currentHumidityLi);
    currentWeather.appendChild(currentWindLi);

};



//fetch and display the five day forecast
function fiveDayForecast(cityNameEl) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameEl + "&appid=18eafa00225477a564d0471bb75359e9&units=imperial" )
    .then(function(response) {
        return response.json();
        
    })
    .then(function(data) {
        let dayPosition = 0;
        //console.log(data);
        for (let i = 0; i < data.list.length; i++)  {
            //TA Symone Varnado went over this with me( this loops through the api data array
            // for the five day forecast which iterates at 3 hrs intervals for 5 days and only catches every day at 3pm(15:00:00) )
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                //get date for each day- Use method of using split from SO to parse out date from object array
                var day = data.list[i].dt_txt.split("-")[2].split(" ")[0];
                var month = data.list[i].dt_txt.split("-")[1];
                var year = data.list[i].dt_txt.split("-")[0];
                //console.log(day, month, year);

                //display date in forecast cards
                var fiveDayDateHeader = document.querySelector("#" + "forecastDate" + dayPosition);
                fiveDayDateHeader.textContent = ("(" + month + "-" + day + "-" + year + ")");
                //console.log(fiveDayDateHeader);

                //display temp and humidity in forecast cards
                //var fiveDayWeather = document.querySelector("#" + "forecastConditions" + dayPosition);
                //fiveDayWeather.innerHTML = "";
                var fiveDayTempP = document.querySelector("#" + "forecastTemp" + dayPosition);
                fiveDayTempP.textContent = ("Temp: " + data.list[i].main.temp);
                var fiveDayHumP = document.querySelector("#" + "forecastHum" + dayPosition);
                fiveDayHumP.textContent = ("Humidity: " + data.list[i].main.humidity + "%")
                //console.log(fiveDayTempP);

                //display 5 day image
                var fiveDayImg = document.querySelector("#" + "forecastImg" + dayPosition);
                fiveDayImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");



                //console.log(data.list[i].weather[0].icon);

                //move through img, temp, and humidity positions
                dayPosition++;

            }

        }
        // let fiveDay = document.querySelector("#five-day")
    })
    
           

};

//fetch and display uv index on current weather
function currentUvIndex(data) {
    //console.log(data)
    // var cityLat = data.coord.lat;
    // var cityLong = data.coord.long;
    fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=18eafa00225477a564d0471bb75359e9")
    .then(function(response) {
        return response.json();
        
    })
    .then(function(data) {
        //  create p tag to hold info
        var uvIndexHTML = document.createElement('p');
        uvIndexHTML.textContent =  'UV Index: '
        // create a div to append to our p tag
        var uvNum = document.createElement('div')
        uvNum.textContent = data.value;
        uvIndexHTML.append(uvNum)

        //change uvNUm with bootstrap class depending on UVIndex value
        
        if(data.value <= 4.0 ) {           
            uvNum.setAttribute('class', "btn btn-success")
        }
        
        if(data.value > 4 && data.value <= 8) {
            uvNum.setAttribute('class', "btn btn-warning")
        }
        if(data.value > 8) {
            uvNum.setAttribute('class', 'btn btn-danger');
        }
        

        var currentWeather = document.querySelector("#daily-conditions").append(uvIndexHTML) 
    })
    //console.log(currentUvIndex(cityLat, cityLong));
};











