<script setup>
import { useFetchGeocoding } from './useFetchGeocoding';
import { useFetchWeather } from './useFetchWeather';
import { useLocalStorage } from '@vueuse/core';

const cityList = ref('');
const queryCity = ref('');
const currentCity = useLocalStorage('currentCity', ref({ name: '' }));
const currentWeather = ref('');

function setCityList() {
  useFetchGeocoding(queryCity.value).then(
    (response) => (cityList.value = response)
  );
}

function setWeather(lat, long) {
  useFetchWeather(lat, long).then(
    (response) => (currentWeather.value = response)
  );
}

function setCity(city) {
  currentCity.value.name = city.name;
  currentCity.value.latitude = city.latitude;
  currentCity.value.longitude = city.longitude;
  setWeather(city.latitude, city.longitude);
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
    queryCity.value = currentCity.value.name;
    setCityList();
    setWeather(currentCity.value.latitude, currentCity.value.longitude);
  }
});
</script>

<template>
  <div>
    current city is: {{ currentCity.name }} at lat
    {{ currentCity.latitude }} and long {{ currentCity.longitude }}
    <button @click="setCityList">Fetch the list of cities</button>
    <div>
      <input type="text" v-model.lazy="queryCity" />
    </div>
    <div>
      <ul>
        <li v-for="city in cityList.results" @click="setCity(city)">
          {{ city.name }} - {{ city.admin1 }}
        </li>
      </ul>
    </div>
  </div>
  {{ currentWeather }}

  <div class="second" v-if="currentWeather">
    Sunrise is at {{ displaySunrise }} Sunset is at:
    {{ displaySunset }}
  </div>
</template>

<style>
li {
  background-color: aliceblue;
  padding: 0.5rem;
  margin: 0.5rem;
}

.second {
  color: red;
}
</style>
