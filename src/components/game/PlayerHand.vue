<template>
  <div :class="$style.container">
    <NumCard />
  </div>
</template>

<script setup lang="ts">
import NumCard from "@/components/game/NumCard.vue";
</script>

<style module>
.container {
  border: 1px solid blue;
}
</style>
