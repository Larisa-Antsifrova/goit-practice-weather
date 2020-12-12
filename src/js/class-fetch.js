export default class Weather {
  constructor(refs) {
    this.refs = refs;
  }
  getFetch(query) {
    const {
      cityRef,
      tempRef,
      iconRef,
      desriptionRef,
      humidityRef,
      windRef,
      weatherRef,
    } = this.refs;
    let apiKey = `fe39d6f1406ac07f37da454e3d39eb30`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) return alert("Something went wrong!");
        return response.json();
      })
      .then((data) => {
        cityRef.textContent = `Weather in ${data.name}`;
        tempRef.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        iconRef.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        iconRef.alt = data.weather[0].description;
        desriptionRef.textContent = data.weather[0].description;
        humidityRef.textContent = `Humidity: ${data.main.humidity}%`;
        windRef.textContent = `Wind speed: ${data.wind.speed}km/h`;
        weatherRef.classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;
      })
      .catch((error) => console.log(error));
  }

  search() {
    const { inputRef, btnRef } = this.refs;

    btnRef.addEventListener("click", () => {
      this.getFetch(inputRef.value);
      inputRef.value = "";
    });

    inputRef.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        // cityName = e.target.value;
        this.getFetch(inputRef.value);
        inputRef.value = "";
      }
    });
  }
}
