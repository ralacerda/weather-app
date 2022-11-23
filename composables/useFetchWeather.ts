export async function useFetchWeather(
  latitude: Number,
  longitude: Number,
  timezone: String
) {
  const { data } = await useFetch(`https://api.open-meteo.com/v1/forecast`, {
    query: {
      latitude,
      longitude,
      timezone,
      daily: 'sunset,sunrise',
    },
  });
  return data.value;
}
