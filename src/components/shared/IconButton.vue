<template>
  <div class="container" @click="emit('onClick')">
    <img class="icon" :src="icon" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
}>();

const emit = defineEmits(["onClick"]);
</script>

<style scoped>
.container {
  box-sizing: border-box;
  aspect-ratio: 1;
  height: 100%;
  display: flex;
  border-radius: 50%;
  border: 0.1rem solid transparent;
}

.container:hover {
  background-color: var(--color-background-mute);
  border: 0.1rem solid var(--color-border-hover);
}

.icon {
  height: 100%;
  padding: 0.3rem;
}

[data-theme="light"] .icon {
  filter: invert(100%);
}
</style>
