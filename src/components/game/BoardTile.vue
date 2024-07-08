<template>
  <div :class="$style.square" ref="root" @mouseover="mouseOver">
    {{ state === TileState.Complete ? val : "" }}
  </div>
</template>

<script setup lang="ts">
import { TileState, type Tile } from "@/stores/game.types";
defineProps<Tile>();

const mouseOver = (e: MouseEvent) => {
  console.log(e);
};
</script>

<style module>
.square {
  width: 50px;
  height: 50px;
  border: 1px solid red;
}
</style>
