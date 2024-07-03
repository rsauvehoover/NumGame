<template>
  <div :class="$style.container">{{ formatTime(timer.elapsed) }}</div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { type Timer, useGameStore } from "@/stores/game";

const gameStore = useGameStore();
const { timerOn, timer } = storeToRefs(gameStore);

let intervalId;

const startTimer = () => {
  intervalId = setInterval(() => {
    gameStore.timerRefresh();
  }, 10);
};

const stopTimer = () => {
  clearInterval(intervalId);
};

const zeroPrefix = (val, digits) => ("000000000" + val).substr(-digits);

const formatTime = (time: Date) => {
  return `${zeroPrefix(time.getUTCMinutes(), 2)}:${zeroPrefix(time.getUTCSeconds(), 2)}.${zeroPrefix(Math.floor(time.getUTCMilliseconds() / 10), 2)}`;
};

watchEffect(() => {
  if (timerOn.value) {
    startTimer();
  } else {
    stopTimer();
  }
});

onBeforeUnmount(() => clearInterval(intervalId));
</script>

<style module>
.container {
  align-self: start;
  font-size: 2rem;
  width: 10rem;
  margin: 0.5rem;
}
</style>
