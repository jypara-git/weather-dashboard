var currentDate = moment().format(" (M/DD/YYYY)");
var latLong;
var cities = [];
var convertTemp = function(kelvin) {
    var formula = Math.round((kelvin - 273.15) * 9/5 + 32);
    return formula;
};
var search = async function(event) {
    var cityInput = $("#city").val().trim();
    // adding cityInput to and array
    cities.push(cityInput);
    // save to localStorage
    localStorage.setItem("city", JSON.stringify(cities));
    $("#current-city").html(cityInput);
    $("#current-city").append(currentDate);

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=eee6ed4de8cdd22d742d70d841a760f5"
    var response = await fetch(apiUrl).catch(function(error){alert("Network Error")});
    if (response.ok) {
        var data = await response.json();
        var tempVal = data.main.temp;
        var tempF = convertTemp(tempVal);
        var weatherIcon = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        $("#current-city").append("<img src=" + iconUrl + ">")
        $("#temperature").html(tempF + "°F");
        var humidity = data.main.humidity;
        $("#humidity").html(humidity + "%");
        var windSpeed = data.wind.speed;
        $("#wind-speed").html(windSpeed + " MPH");
        latLong = data.coord;
    } else {
        alert("Error:" + response.statusText);
    }
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + latLong.lat + "&lon=" +latLong.lon + "&exclude=hourly,currently,minutely&units=imperial&appid=eee6ed4de8cdd22d742d70d841a760f5"
    var response = await fetch(apiUrl2).catch(function(error){alert("Network Error")});
    if (response.ok) {
        var data = await response.json();
        var uvi = data.daily[0].uvi;
        $("#uv-index").html(uvi);
        for (var i = 1; i < 6; i++) {
            var dateString = moment.unix(data.daily[i].dt).format("M/DD/YYYY");
            var icons = data.daily[i].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + icons + "@2x.png";
            $("#future-img" + (i-1)).html("<img src=" +iconurl+ ">");
            $("#future-date" + (i-1)).html(dateString);
            $("#future-temp" + (i-1)).html(data.daily[i].temp.day + "°F");
            $("#future-humid" + (i-1)).html(data.daily[i].humidity + "%");
        }
    } else {
        alert("Error:" + response.statusText);
    }
};
// check if there's something in the localStorage
var citySaved = localStorage.getItem("city");
if (citySaved !== null) {
    cities = JSON.parse(citySaved);
}
console.log(cities);



$("#search-button").on("click", search);


