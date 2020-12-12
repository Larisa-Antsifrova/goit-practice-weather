import css from "./css/styles.css";
// import "./js/fetch.js";
import refs from "./js/refs.js";
import Weather from "./js/class-fetch.js";

const myWeatherApp = new Weather(refs);

myWeatherApp.search();
