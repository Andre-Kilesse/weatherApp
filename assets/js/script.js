const apiKey = 'efa3c2460cdc86c33eaf3b7f891c0243';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.getElementById('inCity');
const searchBtn = document.getElementById('inSearch');
const weatherCard = document.querySelector('.card__weather');
const weatherIcon = document.querySelector('.card__weather-icon');

const checkWeather = async (city) => {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 400) {
            document.querySelector('.error').style.display = 'block';
            return;
        }

        let data = await response.json();

        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        const weather = data.weather[0].main;
        weatherIcon.src = `assets/images/${weather.toLowerCase()}.png`;

        weatherCard.classList.add('show');
        weatherCard.removeAttribute('inert');
        document.querySelector('.error').style.display = 'none';
    } catch (error) {
        console.error(error);
        document.querySelector('.error').style.display = 'block';
    }
};

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
