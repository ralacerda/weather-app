<script setup>
import { useLocalStorage } from '@vueuse/core';

const currentCity = useLocalStorage('currentCity', ref({ name: '' }));
const currentWeather = ref('');
const showModal = ref(false);

function setWeather(latitude, longitude, timezone) {
  currentWeather.value = '';
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

const displaySunrise = computed(() => {
  return currentWeather.value.daily.sunrise[0];
});

const displaySunset = computed(() => {
  return currentWeather.value.daily.sunset[0];
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
    {{ currentCity.name }}
  </div>

  <Transition name="fadeIn" mode="out-in">
    <div class="second" v-if="currentWeather">
      <DisplayTimes :sunset="displaySunset" :sunrise="displaySunrise" />
    </div>
    <div v-else>LOADING WEATHER</div>
  </Transition>
  <button @click="showModal = true">Pick a city</button>

  <Teleport to="body">
    <SearchModal :show="showModal" @close="setCity" />
  </Teleport>
</template>

<style>
.second {
  color: red;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.2s;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
