<template>
  <div :class="{ [$style.container]: true, [$style.dyslexicFont]: dyslexicFontActive }">
    <HeaderBar />
    <div :class="{ [$style.gameContainer]: true, [$style.timer]: timerActive }">
      <GameTimer v-if="timerActive" />
      <GameBoard />
      <div>
        <button @click="timerStart">TIMER START</button>
        <button @click="timerStop">TIMER STOP</button>
        <PlayerHand />
      </div>
    </div>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/controls/HeaderBar.vue";
import GameBoard from "@/components/game/GameBoard.vue";
import PlayerHand from "@/components/game/PlayerHand.vue";
import GameTimer from "@/components/game/GameTimer.vue";
import { ModalsContainer } from "vue-final-modal";
import { storeToRefs } from "pinia";
import { useSettingsStore, Mode } from "@/stores/settings";
import { useGameStore } from "@/stores/game";

const settingsStore = useSettingsStore();
const { timerActive, dyslexicFontActive } = storeToRefs(settingsStore);
const gameStore = useGameStore();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  settingsStore.setMode(event.matches ? Mode.dark : Mode.light);
});

const timerStart = () => gameStore.startTimer();
const timerStop = () => gameStore.stopTimer();
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
