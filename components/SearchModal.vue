<script setup>
const props = defineProps({
  show: Boolean,
});

const cityList = ref('');
const queryCity = ref('');

function setCityList() {
  useFetchGeocoding(queryCity.value).then(
    (response) => (cityList.value = response)
  );
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div>
          <input type="text" v-model.lazy="queryCity" />
          <button @click="setCityList">Fetch the list of cities</button>
        </div>
        <ul>
          <li v-for="city in cityList.results" @click="$emit('close', city)">
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
