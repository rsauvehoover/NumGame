<template>
  <div>
    <HeaderBar />
    <div>Hello {{ isDark }}</div>
  </div>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import { computed } from "vue";
import { useSettingsStore, Mode } from "@/stores/settings";

const settingsStore = useSettingsStore();
const isDark = computed(() => settingsStore.mode === Mode.dark);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  settingsStore.setMode(event.matches ? Mode.dark : Mode.light);
});
</script>
