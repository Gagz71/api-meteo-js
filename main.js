const apiKey = "ad8eaffdde2254e14c7e670698e87819";
const mainBtn = document.querySelector("#main-btn");
const cityName = document.querySelector("#user-choice");
const divInfos = document.querySelector("#city-infos");
const gpsBtn = document.querySelector("#gps-btn")
const divWeatherUser = document.querySelector("#gps-infos");

let userIp="";

mainBtn.addEventListener("click", ()=>{
        getWeather(cityName.value);
})
gpsBtn.addEventListener("click", ()=>{
        getUserCity();
})
/*userChoice.addEventListener("keyup", () => {
        alert(userChoice.value);
})*/

function getWeather(cityName){

        const req = new XMLHttpRequest();

        req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=metric&appid=ad8eaffdde2254e14c7e670698e87819&lang=fr');
        req.onload = () =>{
                data = JSON.parse(req.responseText);
                console.log(data);

                showWeather(data);
        }
        req.send();
}


function showWeather(city){

        let html = "";

        let infos = city.weather;
        let sunrise = city.sys.sunrise;
        let sunset = city.sys.sunset;

        let date1 = new Date(sunrise * 1000);
        let date2 = new Date(sunset * 1000);
        let date1Hours = date1.getHours();
        let date2Hours = date2.getHours();
        let date1Minutes = "0" + date1.getMinutes();
        let date2Minutes = "0" + date2.getMinutes();
        let date1Seconds = "0" + date1.getSeconds();
        let date2Seconds = "0" + date2.getSeconds();
        let sunriseHour = date1Hours + 'h' + date1Minutes.substr(-2) + 'm' + date1Seconds.substr(-2) + 's';
        let sunsetHour = date2Hours + 'h' + date2Minutes.substr(-2) + 'm' + date2Seconds.substr(-2) + 's';

        infos.forEach(e =>{
                html += `
                                <div class="card" style="width: 18rem;">
                                        <div class="card-header">
                                                <img src="http://openweathermap.org/img/wn/${e.icon}@2x.png" class="card-img-top" alt="...">
                                        </div>
                                        
                                        <div class="card-body">
                                                <h4 class="card-title">${city.name}</h4>
                                                <small>${city.sys.country}</small>
                                                <h5 class="card-title text-capitalize">${e.description}</h5>
                                        </div>
                                        <div class="card-body">
                                                <h6 class="card-subtitle mb-2 text-muted">Coordonnées</h6>
                                                <p class="card-text">Longitude : <strong>${city.coord.lon}</strong></p>
                                                <p class="card-text">Lattitude : <strong>${city.coord.lat}</strong></p>
                                        </div>
                                        <div class="card-body">
                                                <h6 class="card-subtitle mb-2 text-muted">Température</h6>
                                                <p class="card-text">Température actuelle: <strong>${city.main.temp}°C</strong></p>
                                                <p class="card-text">Température minimum: <strong>${city.main.temp_min}°C</strong></p>
                                                <p class="card-text">Température maximum: <strong>${city.main.temp_max}°C</strong></p>
                                                <p class="card-text">Pression atmosphérique: <strong>${city.main.pressure}</strong></p>
                                                <p class="card-text">Humidité: <strong>${city.main.humidity}</strong></p>
                                                <p class="card-text">Vitesse du vent: <strong>${city.wind.speed}</strong></p>
                                        </div>
                                        <div class="card-body">
                                                <h6 class="card-subtitle mb-2 text-muted">Lever/Coucher du soleil</h6>
                                                <p class="card-text">Lever du soleil : ${sunriseHour}</p>
                                                <p class="card-text">Coucher du soleil : ${sunsetHour}</p>
                                        </div>
                                </div>
                `;
        })

        divInfos.innerHTML = html;
}

function getUserCity(){

        const req = new XMLHttpRequest();

        //Récupération de l'ip de l'user
        req.open('GET', 'http://api.ipify.org');
        req.onload = () => {
                data = req.responseText;
                userIp = data;

                //Récupération de l'adress url en fonction de l'userIp
                let url  = 'http://api.ipstack.com/' + userIp + '?access_key=1a091b8206918b418d11935d3a3e9002';
                req.open('GET', url);
                req.onload = () => {
                        userCity = JSON.parse(req.responseText);
                        showWeatherUserCity(userCity);
                }
                req.send();
        }
        req.send();
}

function showWeatherUserCity(userCity){

        getWeather(userCity.city);

}
