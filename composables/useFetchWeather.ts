export async function useFetchWeather(latitude: Number, longitude: Number) {
  const { data } = await useFetch(`https://api.open-meteo.com/v1/forecast`, {
    query: {
      latitude,
      longitude,
      timezone: 'America/Sao_Paulo',
      daily: 'sunset,sunrise',
    },
  });
  return data.value;
}

// latitude=${lat}&longitude=${long}&daily=sunrise,sunset&timezone=America%2FSao_Paulo
