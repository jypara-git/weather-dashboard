var currentDate = moment().format(" (M/DD/YYYY)");
var latLong;
var convertTemp = function(kelvin) {
    var formula = Math.round((kelvin - 273.15) * 9/5 + 32);
    return formula;
};
var search = async function(event) {
    var cityInput = $("#city").val().trim();
    $("#current-city").html(cityInput);
    $("#current-city").append(currentDate);

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=eee6ed4de8cdd22d742d70d841a760f5"
    var response = await fetch(apiUrl);
    if (response.ok) {
        var data = await response.json();
        console.log(data);
        var tempVal = data.main.temp;
        var tempF = convertTemp(tempVal);
        var weatherIcon = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w" + weatherIcon + ".png";
        $("#temperature").html(tempF + "°F");
        $("#current-city").attr('scr', iconUrl);
        var humidity = data.main.humidity;
        $("#humidity").html(humidity + "%");
        var windSpeed = data.wind.speed;
        $("#wind-speed").html(windSpeed + " MPH");
        latLong = data.coord;
    } else {
        alert("Error:" + response.statusText);
    }
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + latLong.lat + "&lon=" +latLong.lon + "&exclude=hourly,currently,minutely&units=imperial&appid=eee6ed4de8cdd22d742d70d841a760f5"
    var response = await fetch(apiUrl2);
    console.log(response);
    if (response.ok) {
        var data = await response.json();
        console.log(data);
        var uvi = data.daily[0].uvi;
        $("#uv-index").html(uvi);
        for (var i = 1; i < 6; i++) {
            var dateString = moment.unix(data.daily[i].dt).format("M/DD/YYYY");
            $("#future-date" + (i-1)).html(dateString);
            $("#future-temp" + (i-1)).html(data.daily[i].temp.day + "°F");
            $("#future-humid" + (i-1)).html(data.daily[i].humidity + "%");
        }
    } else {
        alert("Error:" + response.statusText);
    } 
};



$("#search-button").on("click", search);


