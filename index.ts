const apiKey: string = "61c08fda24558fac2f955e6d98018886";

const weatherDataEle: HTMLElement | null =
  document.getElementById("weather-data");

const cityInputEle: HTMLInputElement | null = document.getElementById(
  "city-input"
) as HTMLInputElement;

const formEle: HTMLFormElement | null = document.querySelector("form");

formEle?.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue: string = cityInputEle?.value || ""; // Use optional chaining and provide a default value
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    const iconElement = weatherDataEle?.querySelector(".icon");
    if (iconElement) {
      iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
    }

    const tempElement = weatherDataEle?.querySelector(".temperature");
    if (tempElement) {
      tempElement.textContent = `${temperature}°C`;
    }

    const DescripElement = weatherDataEle?.querySelector(".description");
    if (DescripElement) {
      DescripElement.textContent = description;
    }

    const detailElement = weatherDataEle?.querySelector(".details");
    if (detailElement) {
      detailElement.innerHTML = details.map((dat) => `<div>${dat}</div>`).join('');
    }
  } catch (error) {

    const iconElement = weatherDataEle?.querySelector(".icon");
    if (iconElement) {
      iconElement.innerHTML = "";
    }

    const tempElement = weatherDataEle?.querySelector(".temperature");
    if (tempElement) {
      tempElement.textContent = "";
    }

    const DescripElement = weatherDataEle?.querySelector(".description");
    if (DescripElement) {
      DescripElement.textContent = "An error occured, please try again later";
    }

    const detailElement = weatherDataEle?.querySelector(".details");
    if (detailElement) {
      detailElement.innerHTML = "";
    }
  }
}
