<script setup>
import { useFetchGeocoding } from './useFetchGeocoding';
import { useLocalStorage } from '@vueuse/core';

const stuff = ref('');
const queryCity = ref('');
const currentCity = useLocalStorage('currentCity', ref({ name: '' }));

function setStuff() {
  useFetchGeocoding(queryCity.value).then(
    (response) => (stuff.value = response)
  );
}

function setCity(name) {
  currentCity.name = name;
}

onMounted(() => {
  if (currentCity.value.name) {
    queryCity.value = currentCity.value.name;
    setStuff();
  }
});
</script>

<template>
  <div>
    current city is: {{ currentCity.name }}
    <button @click="setStuff">Fetch the stuff</button>
    <div>
      <input type="text" v-model.lazy="queryCity" />
    </div>
    <div>
      <ul>
        <li v-for="city in stuff.results" @click="currentCity.name = city.name">
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
