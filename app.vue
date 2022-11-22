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

function setCity(name) {
  currentCity.name = name;
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
    current city is: {{ currentCity.name }}
    <button @click="setCityList">Fetch the list of cities</button>
    <div>
      <input type="text" v-model.lazy="queryCity" />
    </div>
    <div>
      <ul>
        <li
          v-for="city in cityList.results"
          @click="currentCity.name = city.name"
        >
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
