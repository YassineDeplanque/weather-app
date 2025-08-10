
function getData() {
    const apiKey = '2abfbeff36b8b04bb84bafc2903e2e9a';
    const city = document.getElementById('city').value;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let degre = data.main.temp - 273.15;

        const printDegre = document.getElementById('degre');
        printDegre.innerText = Math.round(degre) + '°C'

        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const iconImg = document.getElementById('img');
        iconImg.src = iconUrl;


    })
    .catch(error => {
        console.error("Erreur lors de l'appel à l'API :", error);
    });



    fetch(forecastUrl)
    .then(response => {
        if(!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json()
    })
    .then(info => {
        for(let i=0; i<14; i++){
            const littleIconCode = info.list[i].weather[0].icon;
            const littleIconUrl = `http://openweathermap.org/img/wn/${littleIconCode}@2x.png`;

            const littleIconImg = document.getElementById( `littleImg${i}`);
            littleIconImg.src = littleIconUrl;

            const dateTime = new Date(info.list[i].dt * 1000)
            const hour = dateTime .getHours();
            const littleHour = document.getElementById(`littleHour${i}`);
            littleHour.innerText = hour + ':00'

            const littleDegreeCode = Math.round(info.list[i].main.temp - 273.15);
            const littleDegree = document.getElementById(`littleDegree${i}`)
            littleDegree.innerText = littleDegreeCode + '°C'

        }
    })
    .catch(error => {
        console.error("Erreur lors de l'appel à l'API :", error);
    });


}