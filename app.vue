<script setup>
import { useLocalStorage } from '@vueuse/core';

const currentCity = useLocalStorage('currentCity', ref({ name: '' }));
const currentWeather = ref('');
const showModal = ref(false);

function setWeather(latitude, longitude, timezone) {
  useFetchWeather(latitude, longitude, timezone).then(
    (response) => (currentWeather.value = response)
  );
}

function setCity(city = null) {
  if (city) {
    currentCity.value.name = city.name;
    currentCity.value.latitude = city.latitude;
    currentCity.value.longitude = city.longitude;
    currentCity.value.timezone = city.timezone;
    setWeather(city.latitude, city.longitude, city.timezone);
  }
  showModal.value = false;
}

const formatTime = (datetime) => {
  return new Date(datetime).toLocaleTimeString(undefined, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

const displaySunrise = computed(() => {
  return formatTime(currentWeather.value.daily.sunrise[0]);
});

const displaySunset = computed(() => {
  return formatTime(currentWeather.value.daily.sunset[0]);
});

onMounted(() => {
  if (currentCity.value.name) {
    setWeather(
      currentCity.value.latitude,
      currentCity.value.longitude,
      currentCity.value.timezone
    );
  }
});
</script>

<template>
  <div>
    current city is: {{ currentCity.name }} at lat
    {{ currentCity.latitude }} and long {{ currentCity.longitude }}
  </div>
  {{ currentWeather }}

  <div class="second" v-if="currentWeather">
    Sunrise is at {{ displaySunrise }} Sunset is at:
    {{ displaySunset }}
  </div>

  <button @click="showModal = true">Pick a city</button>

  <Teleport to="body">
    <SearchModal :show="showModal" @close="setCity" />
  </Teleport>
</template>

<style>
.second {
  color: red;
}
</style>
