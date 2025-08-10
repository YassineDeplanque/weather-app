
function getData() {
    const apiKey = '2abfbeff36b8b04bb84bafc2903e2e9a';
const city = document.getElementById('city').value;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

console.log(city)

fetch(currentWeatherUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    let degre = data.main.temp - 273.15;
    console.log(`Température : ${degre}°C`);
    console.log(`Météo : ${data.weather[0].description}`);
  })
  .catch(error => {
    console.error("Erreur lors de l'appel à l'API :", error);
  });

}