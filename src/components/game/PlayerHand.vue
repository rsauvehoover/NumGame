<template>
  <div :class="$style.container">
    <div v-for="[id, val] in Object.entries(hand)" :key="id">
      <NumCard :val="val" :id="id" />
    </div>
    <div :class="$style.drawButton" @click="redraw">
      <img :class="$style.buttonIcon" :src="DrawIcon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";
import NumCard from "@/components/game/NumCard.vue";
import DrawIcon from "@/assets/deck.svg";

const gameStore = useGameStore();
const settingsStore = useSettingsStore();
const { hand } = storeToRefs(gameStore);
const { range } = storeToRefs(settingsStore);

const redraw = () => {
  gameStore.generateHand(range.value);
};
</script>

<style module>
.container {
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
}

.drawButton {
  margin-left: auto;
  box-sizing: border-box;
  aspect-ratio: 1;
  height: 50px;
  display: flex;
  border-radius: 5%;
  border: 0.2rem solid var(--color-border);
  padding: 0.2rem;
}

.drawButton:hover {
  background-color: var(--color-background-mute);
  border: 0.2rem solid var(--color-border-hover);
  cursor: pointer;
}

[data-theme="light"] .buttonIcon {
  filter: invert(100%);
}
</style>
