<template>
  <div
    :class="$style.container"
    :style="{ gridTemplateColumns: `repeat(${range.max - range.min + 1}, 50px)` }"
  >
    <div v-for="tile in board" :key="`${tile.row},${tile.col}`">
      <BoardTile v-bind="tile" :id="`${tile.row},${tile.col}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";
import BoardTile from "@/components/game/BoardTile.vue";

const gameStore = useGameStore();
const settings = useSettingsStore();
const { board } = storeToRefs(gameStore);
const { range } = storeToRefs(settings);
</script>

<style module>
.container {
  border: 1px solid green;
  display: grid;
}
</style>
