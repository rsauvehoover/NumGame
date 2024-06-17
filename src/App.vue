<template>
  <div class="container">
    <HeaderBar />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/HeaderBar.vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import { computed } from "vue";
import { useSettingsStore, Mode } from "@/stores/settings";

const settingsStore = useSettingsStore();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  settingsStore.setMode(event.matches ? Mode.dark : Mode.light);
});
</script>

<style scoped>
.container {
  width: 100%;
}
</style>
