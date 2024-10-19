<template>
  <div :class="$style.container">
    <div :class="$style.rowHeader" :style="{ gridTemplateColumns: `repeat(${range.max - range.min + 1}, 50px)` }">
      <div :class="$style.header" v-for="num in headerRange" :key="`r${num}`">
        {{ num }}
      </div>
    </div>
    <div :class="$style.colHeader" :style="{ gridTemplateRows: `repeat(${range.max - range.min + 1}, 50px)` }">
      <div :class="$style.header" v-for="num in headerRange" :key="`c${num}`">
        {{ num }}
      </div>
    </div>
    <div :class="$style.board" :style="{ gridTemplateColumns: `repeat(${range.max - range.min + 1}, 50px)` }">
      <div v-for="tile in board" :key="`${tile.row},${tile.col}`">
        <BoardTile v-bind="tile" :id="`${tile.row},${tile.col}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";
import BoardTile from "@/components/game/BoardTile.vue";

const gameStore = useGameStore();
const settings = useSettingsStore();
const { board } = storeToRefs(gameStore);
const { range } = storeToRefs(settings);

const headerRange = computed(() => {
  const a = [];
  for (let i = range.value.min; i <= range.value.max; i++) {
    a.push(i);
  }
  return a;
});
</script>

<style module>
.container {
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: 50px auto;
  margin-right: 50px;
}

.board {
  grid-row: 2;
  grid-column: 2;
  border: 1px solid green;
  display: grid;
  margin: auto;
}

.rowHeader {
  display: grid;
  grid-row: 1;
  grid-column: 2;
}

.colHeader {
  display: grid;
  grid-row: 2;
  grid-column: 1;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
