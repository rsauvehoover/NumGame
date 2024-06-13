<template>
  <label>
    <input type="checkbox" class="modeToggle" v-model="mode" :true-value="Mode.dark" :false-value="Mode.light" />
    <img :src="mode === Mode.light ? DarkIcon : LightIcon" />
  </label>
</template>

<script setup>
import DarkIcon from "@/assets/dark_mode.svg";
import LightIcon from "@/assets/light_mode.svg";
import { computed } from "vue";
import { useSettingsStore, Mode } from "@/stores/settings";

const settingsStore = useSettingsStore();

const mode = computed({
  get() {
    return settingsStore.mode;
  },
  set(mode) {
    settingsStore.setMode(mode);
  }
});

const toggleTheme = () => {
  settingsStore.toggleMode();
  console.log(mode);
};
</script>

<style scoped>
.modeToggle {
  display: none;
}
</style>
