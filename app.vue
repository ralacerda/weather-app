<script setup>
import { useLocalStorage } from '@vueuse/core';

const currentCity = useLocalStorage('currentCity', ref({}));
const currentWeather = ref('');
const showModal = ref(false);

function setWeather() {
  currentWeather.value = '';
  useFetchWeather(
    currentCity.value.latitude,
    currentCity.value.longitude,
    currentCity.value.timezone
  ).then((response) => (currentWeather.value = response));
}

function setCity(city = null) {
  if (city) {
    currentCity.value.name = city.name;
    currentCity.value.region = city.admin1;
    currentCity.value.latitude = city.latitude;
    currentCity.value.longitude = city.longitude;
    currentCity.value.timezone = city.timezone;
    setWeather();
  }
  showModal.value = false;
}

onMounted(() => {
  if (currentCity.value.name) {
    setWeather();
  }
});
</script>

<template>
  <div class="app_wrapper">
    <div class="text-center p-8">
      <h1 class="text-3xl">
        {{ currentCity.name }}
      </h1>
      <h2 class="text-lg text-blue-50/60">{{ currentCity.region }}</h2>
    </div>
    <Transition name="fadeIn" mode="out-in">
      <template v-if="currentWeather">
        <DisplayTimes :weather="currentWeather" @refresh="setWeather" />
      </template>
      <div v-else-if="currentCity.name">LOADING WEATHER</div>
      <div v-else>...</div>
    </Transition>
    <button @click="showModal = true">Pick a city</button>

    <Teleport to="body">
      <SearchModal :show="showModal" @close="setCity" />
    </Teleport>
  </div>
</template>

<style>
body {
  min-height: 100vh;
  background-color: #000539;
  color: #eef0f2;
  display: grid;
  place-content: center;
}

.app_wrapper {
  height: 80vh;
  width: 80vw;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.1s;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
