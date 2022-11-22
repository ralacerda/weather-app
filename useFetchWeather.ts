export async function useFetchWeather(lat: Number, long: Number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=sunrise,sunset&current_weather=true&timezone=America%2FSao_Paulo`
  );
  return response.json();
}
