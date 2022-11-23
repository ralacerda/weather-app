<script setup>
const props = defineProps(['sunrise', 'sunset']);

const formatTime = (datetime) => {
  return new Date(datetime).toLocaleTimeString(undefined, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<template>{{ formatTime(sunrise) }} {{ formatTime(sunset) }}</template>
