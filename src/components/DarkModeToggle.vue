<template>
  <label class="toggleButton">
    <input type="checkbox" class="checkbox" v-model="mode" :true-value="Mode.dark" :false-value="Mode.light" />
    <img class="icon" :src="mode === Mode.dark ? DarkIcon : LightIcon" />
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
</script>

<style scoped>
.toggleButton {
  box-sizing: border-box;
  aspect-ratio: 1;
  display: flex;
  height: 100%;
  border-radius: 50%;
  border: 0.1rem solid transparent;
}

.toggleButton:hover {
  background-color: var(--color-background-mute);
  border: 0.1rem solid var(--color-border-hover);
}

.icon {
  height: 100%;
  padding: 0.3rem;
}

.checkbox {
  display: none;
}
</style>
