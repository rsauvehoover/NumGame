<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div :class="{ dyslexicFont: dyslexicFont }">
      <h1>{{ $t("settings.title") }}</h1>
      <div>Min {{ range.min }}</div>
      <div>Max {{ range.max }}</div>
      <div>Dyslexia font <input type="checkbox" v-model="dyslexicFont" /></div>
      <div>test</div>
      <div class="buttonContainer">
        <button @click="emit('close')">{{ $t("settings.close") }}</button>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { useSettingsStore, type Range } from "@/stores/settings";
import { computed } from "vue";

const settingsStore = useSettingsStore();

const range = computed({
  get() {
    return settingsStore.range;
  },
  set(val: Range) {
    settingsStore.setRange(val);
  }
});

const dyslexicFont = computed({
  get() {
    return settingsStore.dyslexicFontActive;
  },
  set(val: boolean) {
    settingsStore.setDyslexicFont(val);
  }
});

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

.dyslexicFont {
  font-family: opendyslexic3regular;
}
</style>
