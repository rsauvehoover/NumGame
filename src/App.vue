<template>
  <div :class="{ [$style.container]: true, [$style.dyslexicFont]: dyslexicFontActive }">
    <HeaderBar />
    <GameBoard />
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/controls/HeaderBar.vue";
import GameBoard from "@/components/game/GameBoard.vue";
import { ModalsContainer } from "vue-final-modal";
import { storeToRefs } from "pinia";
import { useSettingsStore, Mode } from "@/stores/settings";

const settingsStore = useSettingsStore();
const { dyslexicFontActive } = storeToRefs(settingsStore);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  settingsStore.setMode(event.matches ? Mode.dark : Mode.light);
});
</script>

<style module>
.container {
  width: 100%;
}

.dyslexicFont {
  font-family: opendyslexic3regular;
}
</style>
