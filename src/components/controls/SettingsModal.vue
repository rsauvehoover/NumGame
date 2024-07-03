<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div :class="{ [$style.dyslexicFont]: dyslexicFont }">
      <div :class="$style.titleContainer">{{ $t("settings.title") }}</div>
      <div>Min {{ range.min }}</div>
      <div>Max {{ range.max }}</div>
      <div style="display: flex">
        {{ $t("settings.fontToggle")
        }}<input :class="$style.toggle" type="checkbox" v-model="dyslexicFont" />
      </div>
      <div>test</div>
      <div :class="$style.buttonContainer">
        <button :class="$style.closeButton" @click="emit('close')">
          {{ $t("settings.close") }}
        </button>
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
  min-width: 20vw;
  flex-direction: column;
  padding: 0.4rem 1rem 0.8rem 1rem;
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
</style>

<style module>
.titleContainer {
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 2rem;
}

.toggle {
  margin-left: auto;
}

.buttonContainer {
  width: 100%;
  display: flex;
  margin: auto;
  justify-content: center;
}

.closeButton {
  border-radius: 0.3rem;
  border-style: none;
  outline: none;
  padding: 0.5rem 0.8rem;
  background: var(--vt-c-grey);
}

.closeButton:hover {
  cursor: pointer;
  background: var(--vt-c-blue-muted);
}

.dyslexicFont {
  font-family: opendyslexic3regular;
}
</style>
