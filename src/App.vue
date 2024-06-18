<template>
  <div class="container" :class="{ dyslexicFont: dyslexicFontActive }">
    <HeaderBar />
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/controls/HeaderBar.vue";
import { ModalsContainer } from "vue-final-modal";
import { storeToRefs } from "pinia";
import { useSettingsStore, Mode } from "@/stores/settings";

const settingsStore = useSettingsStore();
const { dyslexicFontActive } = storeToRefs(settingsStore);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  settingsStore.setMode(event.matches ? Mode.dark : Mode.light);
});
</script>

<style scoped>
.container {
  width: 100%;
}

.dyslexicFont {
  font-family: opendyslexic3regular;
}
</style>
