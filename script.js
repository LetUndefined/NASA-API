document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "https://api.nasa.gov/insight_weather/?api_key=5S2JU8jccSswXGHrNcLf01HhFcjRUXRwRpoV0tV0&feedtype=json&ver=1.0";

  const refresh = document.querySelector("#refresh");

  refresh.addEventListener("click", () => {
    fetch(apiKey)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`See Error: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const solKeys = data.sol_keys;
        const lastDay = solKeys[solKeys.length - 1];
        const weather = data[lastDay];

        const date = document.querySelector("#date");
        const season = document.querySelector("#season");

        date.innerHTML = `<p id="date">Current Day: ${lastDay}</p>`;
        season.innerHTML = `<p id="season">Current Season: ${weather.Season}</p>`;

        const maxTemp = document.querySelector("#mx-temp");
        const minTemp = document.querySelector("#mn-temp");
        const avgTemp = document.querySelector("#av-temp");
        const samplesAT = document.querySelector("#samplesAT");

        samplesAT.textContent = `Recorded Samples from current Sol: ${weather.AT.ct}`;
        maxTemp.textContent = `Maximum Temperature on Mars is: ${weather.AT.mx} °C`;
        minTemp.textContent = `Minimum Temperature on Mars is: ${weather.AT.mn} °C`;
        avgTemp.textContent = `Average Temperature on Mars is: ${weather.AT.av} °C`;

        const maxSpeed = document.querySelector("#mx-speed");
        const minSpeed = document.querySelector("#mn-speed");
        const avgSpeed = document.querySelector("#av-speed");
        const samplesHWS = document.querySelector("#samplesHWS");

        samplesHWS.textContent = `Recorded Samples from current Sol: ${weather.HWS.ct}`;
        maxSpeed.textContent = `Maximum Windspeed on Mars is: ${weather.HWS.mx} MPH`;
        minSpeed.textContent = `Minimum Windspeed on Mars is: ${weather.HWS.mn} MPH`;
        avgSpeed.textContent = `Average Windspeed on Mars is: ${weather.HWS.av} MPH`;

        const previous = document.querySelector("#previous");

        previous.addEventListener("click", () => {});
      })
      .catch((error) => {
        console.error("Error fetching Mars weather data:", error);
      });
  });
});
