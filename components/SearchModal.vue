<script setup>
const props = defineProps({
  show: Boolean,
});

const citiesList = ref('');
const queryCity = ref('');
const fetchingCities = ref(false);

async function fetchCityList() {
  citiesList.value = '';
  fetchingCities.value = true;
  citiesList.value = await useFetchGeocoding(queryCity.value);
  fetchingCities.value = false;
}

const filteredCities = computed(() => {
  if (citiesList.value) {
    return citiesList.value.results
      .filter(
        (city) => city.feature_code.startsWith('PPL') && city.population > 0
      )
      .sort((a, b) => b.population - a.population);
  }
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div>
          <input type="text" v-model.lazy="queryCity" />
          <button @click="fetchCityList">Fetch the list of cities</button>
        </div>
        <div v-if="fetchingCities">LOADING CITIES</div>
        <ul>
          <li v-for="city in filteredCities" @click="$emit('close', city)">
            {{ city.name }} - {{ city.admin1 }}
          </li>
        </ul>
        <button @click="$emit('close')">close</button>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 10;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
</style>
