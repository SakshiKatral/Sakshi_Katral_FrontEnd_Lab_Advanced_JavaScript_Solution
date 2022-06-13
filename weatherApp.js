const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search_Box');
searchBox.addEventListener('keypress', setQuery);

searchBox.value = '';
function setQuery(e) {
    if(e.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => weather.json())
        .then((response) => {
            var result = response.message;

            if(result != undefined) {
                alert(result);
            }{
                displayResults(response)
            }
        }).catch(error => {
            console.log(error)
        });
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_element = document.querySelector('.current .weather');
    weather_element.innerText = weather.weather[0].main;

    let high_Low = document.querySelector('.high_Low');
    high_Low.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                    "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thersday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    searchBox.value = '';
    return `${day} ${date} ${month} ${year}`;

}