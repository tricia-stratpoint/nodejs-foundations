// weather.js

async function getWeather() {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=14.6&longitude=121.0&current_weather=true";

    // Call fetch
    const response = await fetch(url);

    // Convert to JSON
    const data = await response.json();

    // Print current_weather object
    console.log("Current Weather:", data.current_weather);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Run the function
getWeather();