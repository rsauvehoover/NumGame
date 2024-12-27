<template>
  <div
    :class="{
      [$style.square]: true,
      [$style.hovered]: props.hovered,
      [$style.inactive]: props.state === TileState.Inactive,
      [$style.complete]: props.state === TileState.Complete
    }"
    ref="root"
  >
    {{ props.state === TileState.Complete ? props.val : "" }}
  </div>
</template>

<script setup lang="ts">
import { TileState, type Tile } from "@/stores/game.types";
const props = defineProps<Tile>();
</script>

<style module>
.square {
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-border);
  background: var(--color-active-square);
}

.inactive {
  background: var(--color-default-square);
}

.complete {
  background: green;
}

.hovered {
  background: red;
}
</style>
