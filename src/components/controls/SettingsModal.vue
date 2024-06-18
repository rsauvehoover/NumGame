<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>{{ $t("settings.title") }}</h1>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div class="buttonContainer">
      <button @click="emit('close')">{{ $t("settings.close") }}</button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-background);
  border: 0.1rem solid var(--color-border);
}

.modal-content > * + * {
  margin: 0.5rem 0;
}

.modal-content h1 {
  font-size: 1.375rem;
}

.buttonContainer {
  width: 100%;
  display: flex;
  margin: auto;
  justify-content: center;
}
</style>
