

"use strict";

document.getElementById("btn").addEventListener("click", function () {
    var city = document.getElementById("i1").value;
    console.log(city);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var res = JSON.parse(xmlhttp.responseText);
            if (res && res.current) {
                var temperature = res.current.temperature;
                var weatherDescription = res.current.weather_descriptions[0];
                var icon = res.current.weather_icons[0];
                var humidity = res.current.humidity;
                var windspeed = res.current.wind_speed;
                document.getElementById("weatherInfo").innerHTML = `
                    <h3>Weather in ${city}</h3>
                    <img src="${icon}" alt="Weather Icon">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${weatherDescription}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed:${windspeed}</p>
                `;
            } else {
                document.getElementById("weatherInfo").innerHTML = "<p>Weather data not available.</p>";
            }
        } else if (xmlhttp.readyState == 4) {
            console.log("Request failed with status: " + xmlhttp.status);
            document.getElementById("weatherInfo").innerHTML = "<p>Failed to fetch data.</p>";
        }
    };

    xmlhttp.open("GET", `http://api.weatherstack.com/current?access_key=dc2031702a46efcf08d15565d32c4555&query=${city}`, true);

    xmlhttp.send(); 
});
