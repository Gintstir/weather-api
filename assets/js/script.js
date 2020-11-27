

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



//get value from search bar
function getCurrentWeather(event) {
    event.preventDefault();    
    console.log("this is working");

    var cityNameEl = document.querySelector("#cityName").value;   
    cityWeather(cityNameEl);
};


//fetch call for current weather
function cityWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=18eafa00225477a564d0471bb75359e9&units=imperial")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);        
        displayTodayWeather(data);
        fiveDayForecast(city);
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
        console.log(data);
        for (let i = 0; i < data.list.length; i++)  {
            //TA Symone Varnado went over this with me( this loops through the api data array
            // for the five day forecast which iterates at 3 hrs intervals for 5 days and only catches every day at 3pm(15:00:00) )
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                //get date for each day- Use method of using split from SO to parse out date from object array
                var day = data.list[i].dt_txt.split("-")[2].split(" ")[0];
                var month = data.list[i].dt_txt.split("-")[1];
                var year = data.list[i].dt_txt.split("-")[0];
                console.log(day, month, year);

                //display date in forecast cards
                var fiveDayDateHeader = document.querySelector("#" + "forecastDate" + dayPosition);
                fiveDayDateHeader.textContent = ("(" + month + "-" + day + "-" + year + ")");
                console.log(fiveDayDateHeader);

                //display temp and humidity in forecast cards
                //var fiveDayWeather = document.querySelector("#" + "forecastConditions" + dayPosition);
                //fiveDayWeather.innerHTML = "";
                var fiveDayTempP = document.querySelector("#" + "forecastTemp" + dayPosition);
                fiveDayTempP.textContent = ("Temp: " + data.list[i].main.temp);
                var fiveDayHumP = document.querySelector("#" + "forecastHum" + dayPosition);
                fiveDayHumP.textContent = ("Humidity: " + data.list[i].main.humidity + "%")
                console.log(fiveDayTempP);

                //display 5 day image
                var fiveDayImg = document.querySelector("#" + "forecastImg" + dayPosition);
                fiveDayImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");



                console.log(data.list[i].weather[0].icon);

                //move through img, temp, and humidity positions
                dayPosition++;

            }

        }
        // let fiveDay = document.querySelector("#five-day")
    })
    
           

};

//fetch and display uv index on current weather
function currentUvIndex(data) {
    console.log(data)
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



