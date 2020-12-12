import refs from "./refs.js";
import debounce from "lodash.debounce";
console.log(refs);
const {
  cityRef,
  tempRef,
  iconRef,
  desriptionRef,
  humidityRef,
  windRef,
  weatherRef,
  inputRef,
  btnRef,
} = refs;
let apiKey = `fe39d6f1406ac07f37da454e3d39eb30`;
let cityName = "Kyiv";
// inputRef.addEventListener(
//   "input",
//   debounce((e) => {
//     console.log(e.target.value);
//     cityName = e.target.value;
//     getFetch(cityName);
//   }, 1000),
// );

btnRef.addEventListener("click", () => getFetch(inputRef.value));
inputRef.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    cityName = e.target.value;
    getFetch(inputRef.value);
  }
});
function getFetch(query) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
  let result = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cityRef.textContent = `Weather in ${data.name}`;
      tempRef.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
      iconRef.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      iconRef.alt = data.weather[0].description;
      desriptionRef.textContent = data.weather[0].description;
      humidityRef.textContent = `Humidity: ${data.main.humidity}%`;
      windRef.textContent = `Wind speed: ${data.wind.speed}km/h`;
      weatherRef.classList.remove("loading");
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')
`;
    })
    .catch((error) => console.log(error), console.log("Mistake"));
  console.log(result);
}
