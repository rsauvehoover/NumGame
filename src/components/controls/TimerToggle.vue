<template>
  <IconButton @onClick="toggleTimer" :icon="timerActive ? TimerOn : TimerOff" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore, Mode } from "@/stores/settings";
import TimerOn from "@/assets/timer.svg";
import TimerOff from "@/assets/timer_off.svg";
import IconButton from "@/components/shared/IconButton.vue";

const settingsStore = useSettingsStore();
const { timerActive } = storeToRefs(settingsStore);

const toggleTimer = () => {
  settingsStore.toggleTimer();
};
</script>
