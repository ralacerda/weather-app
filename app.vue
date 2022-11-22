<script setup>
import { useFetchGeocoding } from './useFetchGeocoding';
import { useLocalStorage } from '@vueuse/core';

const cityList = ref('');
const queryCity = ref('');
const currentCity = useLocalStorage('currentCity', ref({ name: '' }));

function setCityList() {
  useFetchGeocoding(queryCity.value).then(
    (response) => (cityList.value = response)
  );
}

function setCity(city, event) {
  currentCity.value.name = city.name;
  currentCity.value.latitude = city.latitude;
  currentCity.value.longitude = city.longitude;
}

onMounted(() => {
  if (currentCity.value.name) {
    queryCity.value = currentCity.value.name;
    setCityList();
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
</template>

<style>
li {
  background-color: aliceblue;
  padding: 0.5rem;
  margin: 0.5rem;
}
</style>
