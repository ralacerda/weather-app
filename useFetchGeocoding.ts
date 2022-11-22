export async function useFetchGeocoding(city: String) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  return response.json();
}
