<template>
  <div :class="$style.container">
    <div v-for="[id, val] in Object.entries(hand)">
      <NumCard :val="val" :id="id" :key="id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import NumCard from "@/components/game/NumCard.vue";

const gameStore = useGameStore();
const { hand } = storeToRefs(gameStore);
</script>

<style module>
.container {
  width: 700px;
  border: 1px solid blue;
  display: flex;
}
</style>
