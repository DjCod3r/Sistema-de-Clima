document.querySelector('.busca').addEventListener('submit', async(event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        showWarning('Carregando...')
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=138d287c76c1cbf307ad1cf17359ec84&units=metric&lang=pt_br`

        let result = await fetch(url);
        let json = await result.json();
        console.log(json)

        if(json.cod == 200){

            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                cloud: json.weather[0].description,
                humidity: json.main.humidity,
            })

        }else{
            clearInfo();
            showWarning('Local não encontrado')
        }
    }
})

function showInfo(json) {
    showWarning('')
    
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span> `
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`


    document.querySelector('.info img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.nuvemInfo').innerHTML = `${json.cloud}`
    document.querySelector('.humidade').innerHTML = `Humidade: ${json.humidity} <span>%</span>`
    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}