<template>
  <IconButton @onClick="toggleDarkMode" :icon="mode === Mode.dark ? DarkIcon : LightIcon" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore, Mode } from "@/stores/settings";
import DarkIcon from "@/assets/dark_mode.svg";
import LightIcon from "@/assets/light_mode.svg";
import IconButton from "@/components/IconButton.vue";

const settingsStore = useSettingsStore();
const { mode } = storeToRefs(settingsStore);

const toggleDarkMode = () => {
  settingsStore.setMode(mode.value === Mode.dark ? Mode.light : Mode.dark);
};
</script>
