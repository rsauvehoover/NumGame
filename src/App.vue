<template>
  <div :class="{ [$style.container]: true, [$style.dyslexicFont]: dyslexicFontActive }">
    <HeaderBar />
    <div :class="{ [$style.gameContainer]: true, [$style.timer]: timerActive }">
      <GameTimer v-if="timerActive" />
      <GameBoard />
      <PlayerHand />
      <button @click="tmp">Restart</button>
    </div>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { ModalsContainer } from "vue-final-modal";
import { storeToRefs } from "pinia";
import { useSettingsStore, Mode } from "@/stores/settings";
import { useGameStore } from "@/stores/game";
import HeaderBar from "@/components/controls/HeaderBar.vue";
import GameBoard from "@/components/game/GameBoard.vue";
import PlayerHand from "@/components/game/PlayerHand.vue";
import GameTimer from "@/components/game/GameTimer.vue";

const gameStore = useGameStore();
const settingsStore = useSettingsStore();
const { activeTiles } = storeToRefs(gameStore);
const { timerActive, dyslexicFontActive, range, numStartingTiles } = storeToRefs(settingsStore);

watch(
  range,
  () => {
    gameStore.initializeBoard(range.value, numStartingTiles.value);
  },
  { immediate: true }
);

watch(
  activeTiles,
  () => {
    if (activeTiles.value.length === 0) {
      // Handle win here
      alert("your did it");
      gameStore.stopTimer();
    }
  },
  { immediate: true }
);

const tmp = () => {
  gameStore.startTimer();
  gameStore.initializeBoard(range.value, numStartingTiles.value);
};

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  settingsStore.setMode(event.matches ? Mode.dark : Mode.light);
});
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.gameContainer {
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
  height: 100%;
  margin: auto;
}

.timerActive {
  grid-template-rows: fit-content(25%) auto auto;
}

.dyslexicFont {
  font-family: opendyslexic3regular;
}
</style>
