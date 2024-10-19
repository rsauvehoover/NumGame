<template>
  <div :class="$style.origin">
    <div
      :class="$style.card"
      ref="card"
      @mousedown.prevent="dragStart"
      @touchstart.prevent="dragStart"
    >
      {{ props.val }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/game";
import { useSettingsStore } from "@/stores/settings";
import { TileState } from "@/stores/game.types";

const gameStore = useGameStore();
const settingsStore = useSettingsStore();

const props = defineProps<{ id: string; val: number }>();

interface Coord {
  x: number;
  y: number;
}

const card = ref<HTMLElement | null>(null);

let isMouse = true;
let shiftOffset: Coord = { x: 0, y: 0 };

const dragStart = (e: MouseEvent | TouchEvent) => {
  if (!card.value) return;
  const boundingRect = card.value.getBoundingClientRect();
  if (e instanceof MouseEvent) {
    shiftOffset = { x: e.clientX - boundingRect.left, y: e.clientY - boundingRect.top };
    move({ x: e.pageX, y: e.pageY });
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", dragRelease);
  } else {
    shiftOffset = {
      x: e.changedTouches[0].clientX - boundingRect.left,
      y: e.changedTouches[0].clientY - boundingRect.top
    };
    move({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY });
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchcancel", dragRelease);
    document.addEventListener("touchend", dragRelease);
  }
};

const dragRelease = (e: MouseEvent | TouchEvent) => {
  const coord = getCoord(e);
  const target = getSquareUnderCoord(coord);

  gameStore.setHoveredTile("");
  if (
    target &&
    target.id in gameStore.board &&
    gameStore.board[target.id].state === TileState.Active &&
    gameStore.board[target.id].val === props.val
  ) {
    const boundingRect = target?.getBoundingClientRect();
    move({ x: boundingRect?.left, y: boundingRect?.top }, false);
    gameStore.removeFromHand(props.id);
    gameStore.setTileState(target.id, TileState.Complete);
    gameStore.activateAdjacentTiles(target.id, settingsStore.range);
  } else {
    move();
  }

  if (isMouse) {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", dragRelease);
  } else {
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchcancel", dragRelease);
    document.removeEventListener("touchend", dragRelease);
  }
};

const move = (coord?: Coord, shift: boolean = true) => {
  if (card.value) {
    card.value.style.left = coord ? `${coord.x - (shift ? shiftOffset.x : 0)}px` : "";
    card.value.style.top = coord ? `${coord.y - (shift ? shiftOffset.y : 0)}px` : "";
  }
};

const getSquareUnderCoord = (coord: Coord): Element | null => {
  if (!card.value) return null;
  card.value.hidden = true;
  const el = document.elementFromPoint(coord.x, coord.y);
  card.value.hidden = false;
  return el;
};

const getCoord = (e: MouseEvent | TouchEvent): Coord => {
  if (e instanceof MouseEvent) {
    return { x: e.pageX, y: e.pageY };
  } else {
    return { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
  }
};

const handleMove = (e: MouseEvent | TouchEvent) => {
  const coord = getCoord(e);
  const target = getSquareUnderCoord(coord);

  if (
    target &&
    target.id in gameStore.board &&
    gameStore.board[target.id].state === TileState.Active
  ) {
    gameStore.setHoveredTile(target.id);
  } else {
    gameStore.setHoveredTile("");
  }
  move(coord);
};
</script>

<style module>
.card {
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
  border: 3px solid yellow;
}

.origin {
  width: 50px;
  height: 50px;
}
</style>
