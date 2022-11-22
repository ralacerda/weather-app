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

function setCity(city, event) {
  currentCity.value.name = city.name;
  currentCity.value.latitude = city.latitude;
  currentCity.value.longitude = city.longitude;
  setWeather(city.latitude, city.longitude);
}

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
        <li v-for="city in cityList.results" @click="setCity(city, $event)">
          {{ city.name }} - {{ city.admin1 }}
        </li>
      </ul>
    </div>
  </div>
  {{ currentWeather }}

  <div class="second" v-if="currentWeather">
    {{ currentWeather.current_weather }}
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
