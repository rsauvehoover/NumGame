<template>
  <div :class="$style.container">
    <div v-for="tile in board" :key="`${tile.row},${tile.col}`">
      <BoardTile v-bind="tile" :id="`${tile.row},${tile.col}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import BoardTile from "@/components/game/BoardTile.vue";

const gameStore = useGameStore();
const { board } = storeToRefs(gameStore);
</script>

<style module>
.container {
  border: 1px solid green;
}
</style>
