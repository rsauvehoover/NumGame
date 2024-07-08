<template>
  <div :class="$style.container">
    <div v-for="tile in board">
      <BoardTile v-bind="tile" :id="`${tile.row},${tile.col}`" />
    </div>
    <!-- <BoardTile ref="tile" :state="TileState.Active" :val="9" :row="0" :col="0" :id="`${0},${0}`" /> -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import BoardTile from "@/components/game/BoardTile.vue";
import { useGameStore } from "@/stores/game";
import { type Tile, TileState } from "@/stores/game.types";

const gameStore = useGameStore();
const { board } = storeToRefs(gameStore);

const tile = ref(null);

onMounted(() => {
  gameStore.board["0,0"] = { val: 9, row: 0, col: 0, state: TileState.Active };
  gameStore.board["1,0"] = { val: 9, row: 1, col: 0, state: TileState.Active };
  gameStore.board["2,0"] = { val: 9, row: 2, col: 0, state: TileState.Active };
});
</script>

<style module>
.container {
  border: 1px solid green;
}
</style>
