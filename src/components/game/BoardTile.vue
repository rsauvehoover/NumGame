<template>
  <div :class="{ [$style.square]: true, [$style.hovered]: hovered }" ref="root">
    {{ state === TileState.Complete ? val : "" }}
  </div>
</template>

<script setup lang="ts">
import { TileState, type Tile } from "@/stores/game.types";
defineProps<Tile>();
</script>

<style module>
.square {
  width: 50px;
  height: 50px;
  border: 1px solid red;
}

.hovered {
  background: red;
}
</style>
