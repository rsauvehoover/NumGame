<template>
  <div :class="$style.card" ref="card" @mousedown.prevent="dragStart" @touchstart.prevent="dragStart"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/game";
import { TileState } from "@/stores/game.types";

const gameStore = useGameStore();

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

  console.log(target!.id);

  if (target && gameStore.board[target.id]) {
    const boundingRect = target?.getBoundingClientRect();
    if (card.value) {
      card.value.style.left = `${boundingRect?.left}px`;
      card.value.style.top = `${boundingRect?.top}px`;
    }

    gameStore.setTileState(target.id, TileState.Complete);

    // console.log(gameStore.board[0]);
  } else {
    move(startCoord);
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
</style>
