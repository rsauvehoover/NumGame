<template>
  <div :class="$style.origin">
    <div :class="$style.card" ref="card" @mousedown.prevent="dragStart" @touchstart.prevent="dragStart">
      {{ val }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/game";
import { TileState } from "@/stores/game.types";

const gameStore = useGameStore();

const props = defineProps<{ id: string; val: number }>();

interface Coord {
  x: number;
  y: number;
}

const card = ref<HTMLElement | null>(null);

let isMouse = true;
let shiftOffset: Coord = { x: 0, y: 0 };
let startCoord: Coord = { x: 0, y: 0 };

const dragStart = (e: MouseEvent | TouchEvent) => {
  if (!card.value) return;
  const boundingRect = card.value.getBoundingClientRect();
  if (e instanceof MouseEvent) {
    shiftOffset = { x: e.clientX - boundingRect.left, y: e.clientY - boundingRect.top };
    startCoord = { x: e.clientX, y: e.clientY };
    move({ x: e.pageX, y: e.pageY });
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", dragRelease);
  } else {
    shiftOffset = {
      x: e.changedTouches[0].clientX - boundingRect.left,
      y: e.changedTouches[0].clientY - boundingRect.top
    };
    startCoord = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    move({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY });
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchcancel", dragRelease);
    document.addEventListener("touchend", dragRelease);
  }
};

const dragRelease = (e: MouseEvent | TouchEvent) => {
  const coord = getCoord(e);
  const target = getSquareUnderCoord(coord);

  if (isMouse) {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", dragRelease);
  } else {
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchcancel", dragRelease);
    document.removeEventListener("touchend", dragRelease);
  }

  if (
    target &&
    target.id in gameStore.board &&
    gameStore.board[target.id].state === TileState.Active &&
    gameStore.board[target.id].val === props.val
  ) {
    const boundingRect = target?.getBoundingClientRect();
    if (card.value) {
      card.value.style.left = `${boundingRect?.left}px`;
      card.value.style.top = `${boundingRect?.top}px`;
    }
    gameStore.removeFromHand(props.id);
    gameStore.setTileState(target.id, TileState.Complete);
  } else {
    move(startCoord);
  }
};

const move = (coord: Coord) => {
  if (card.value) {
    card.value.style.left = `${coord.x - shiftOffset.x}px`;
    card.value.style.top = `${coord.y - shiftOffset.y}px`;
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
    gameStore.board[target.id].state === TileState.Active &&
    gameStore.board[target.id].val === props.val
  ) {
    gameStore.setHoveredTile(target.id);
  } else {
    gameStore.setHoveredTile("");
  }
  move(getCoord(e));
};
</script>

<style module>
.card {
  cursor: move;
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
