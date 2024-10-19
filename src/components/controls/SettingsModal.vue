<template>
  <VueFinalModal class="modal" content-class="modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div :class="{ [$style.dyslexicFont]: dyslexicFont }">
      <div :class="$style.titleContainer">{{ $t("settings.title") }}</div>
      <div>Min <input type="number" min="1" :max="rangeMax" v-model.number="rangeMin" /></div>
      <div>Max <input type="number" :min="rangeMin" max="12" v-model.number="rangeMax" /></div>
      <div style="display: flex">
        Starting Tiles {{ numStartingTiles }}
        <input type="range" v-model.number="numStartingTiles" name="min" :min="1" max="10" />
      </div>
      <div style="display: flex">
        {{ $t("settings.fontToggle")
        }}<input :class="$style.toggle" type="checkbox" v-model="dyslexicFont" />
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { useSettingsStore } from "@/stores/settings";
import { computed } from "vue";

const settingsStore = useSettingsStore();

const rangeMin = computed({
  get() {
    return settingsStore.range.min;
  },
  set(val: number) {
    settingsStore.setRangeMin(val);
  }
});

const rangeMax = computed({
  get() {
    return settingsStore.range.max;
  },
  set(val: number) {
    settingsStore.setRangeMax(val);
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
