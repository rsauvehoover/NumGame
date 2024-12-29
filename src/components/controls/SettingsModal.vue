<template>
  <VueFinalModal class="modal" content-class="modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div :class="{ [$style.dyslexicFont]: dyslexicFont }">
      <div :class="$style.titleContainer">{{ $t("settings.title") }}</div>
      <div style="display: flex">
        {{ $t("settings.rangeMin") }}
        <vue-number-input controls center size="small" :class="$style.input" :min="1" :max="RANGE_MAX"
          v-model.number="rangeMin" />
      </div>
      <div style="display: flex">
        {{ $t("settings.numOperands") }}
        <vue-number-input controls center size="small" :class="$style.input" :min="1" :max="MAX_OPERANDS"
          v-model.number="numOperands" />
      </div>
      <div style="display: flex">
        {{ $t("settings.startingTiles") }}
        <vue-number-input controls center size="small" :class="$style.input" :min="1" :max="10"
          v-model.number="numStartingTiles" />
      </div>
      <div style="display: flex">
        {{ $t("settings.fontToggle") }}
        <input :class="$style.input" type="checkbox" v-model="dyslexicFont" />
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { useSettingsStore } from "@/stores/settings";
import { computed } from "vue";

const RANGE_MAX = 24;
const MAX_OPERANDS = 12;

const settingsStore = useSettingsStore();

const rangeMin = computed({
  get() {
    return settingsStore.range.min;
  },
  set(val: number) {
    settingsStore.setRangeMin(val);
  }
});

const numOperands = computed({
  get() {
    return settingsStore.numOperands;
  },
  set(val: number) {
    settingsStore.setNumOperands(val);
  }
});

const numStartingTiles = computed({
  get() {
    return settingsStore.numStartingTiles;
  },
  set(val: number) {
    settingsStore.setNumStartingTiles(val);
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

.modal-content>*+* {
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

.input {
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
