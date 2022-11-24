<script setup>
import SunAngle from '~icons/mdi/sun-angle-outline';
import Refresh from '~icons/mdi/refresh';

const props = defineProps(['weather']);

const formatTime = (datetime) => {
  return new Date(datetime).toLocaleTimeString(undefined, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

const displaySunrise = computed(() => {
  return formatTime(props.weather.daily.sunrise[0]);
});

const displaySunset = computed(() => {
  return formatTime(props.weather.daily.sunset[0]);
});
</script>

<template>
  <div class="text-3xl select-none">
    <SunAngle data-flip />
    <SunAngle />
    {{ displaySunrise }} {{ displaySunset }}
    <button @click="$emit('refresh')"><Refresh /></button>
  </div>
</template>

<style>
[data-flip] {
  transform: scaleX(-100%);
}
</style>
