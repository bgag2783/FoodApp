var cities = [
    {
        id: 'sanjose',
        name: "San Jose",
        lat: 3.3382082,
        lng: -121.88632860000001,
        lastUpdated: -1,
        weatherData: null
},
    {
        id: 'sydney',
        name: "Sydney",
        lat: -33.8674869,
        lng: 151.20699020000006,
        lastUpdated: -1,
        weatherData: null
}
];

function getWeatherDataForCityId(city) {
    $.ajax({
        url: 'https://api.forecast.io/forecast/4230f69dc16497beb3b914b887b4419a/' + city.lat + ',' + city.lng + '?units=us',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data){
            city.weatherData = data;
            city.lastUpdated = new Date().getTime();
            console.log(city.weatherData);
            if (city.id == 'sanjose') {
                var temp = city.weatherData.currently.temperature;
                $("#cityListSJTemp").html(temp.toPrecision(2) + "˚");
            }
            if (city.id == 'sydney') {
                var temp = city.weatherData.currently.temperature;
                $("#cityListSyTemp").html(temp.toPrecision(2) + "˚");
            }
            //if(context === 'list'){
            //    renderCitiesList();
            //}
            //else if (context === 'details'){
            //    //renderSelectedCity();
            //}
        }
    });
}


function formatTemperature(temp){
    return Math.round(true ? (temp * 9/5 + 32) : temp) + "'";
}
function getLocalDate(time, timezoneOffset, timeOffsetSinceLastRefresh){
    timeOffsetSinceLastRefresh = timeOffsetSinceLastRefresh ? timeOffsetSinceLastRefresh : 0;
    var date = new Date(time * 1000 + timeOffsetSinceLastRefresh);
    var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}


$(window).ready(function () {
    getWeatherDataForCityId(cities[0]),
    getWeatherDataForCityId(cities[1])
});