<template>
  <div class="container">
    <HeaderBar />
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/controls/HeaderBar.vue";
import DarkModeToggle from "@/components/controls/DarkModeToggle.vue";
import { computed } from "vue";
import { useSettingsStore, Mode } from "@/stores/settings";
import { ModalsContainer } from "vue-final-modal";

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
