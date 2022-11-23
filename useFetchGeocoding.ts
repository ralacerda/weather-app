export async function useFetchGeocoding(name: String) {
  const { data } = await useFetch(
    `https://geocoding-api.open-meteo.com/v1/search`,
    { query: { name } }
  );
  return data.value;
}
