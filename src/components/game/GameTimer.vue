<template>
  <div :class="$style.container">{{ formatTime(timer.elapsed) }}</div>
</template>

<script setup lang="ts">
import { watchEffect, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();
const { timerOn, timer } = storeToRefs(gameStore);

let intervalId: ReturnType<typeof setInterval>;

const startTimer = () => {
  intervalId = setInterval(() => {
    gameStore.timerRefresh();
  }, 10);
};

const stopTimer = () => {
  clearInterval(intervalId);
};

const zeroPrefix = (val: number, digits: number) => ("000000000" + val).slice(-digits);

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
  font-size: 2rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
