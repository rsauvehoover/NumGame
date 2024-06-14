<template>
  <div class="container" @click="toggle">
    <img class="icon" :src="TranslateIcon" />
  </div>
  <!--
  <select class="langSelect" v-model="$i18n.locale">
    <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
      {{ lang.text }}
    </option>
  </select>
  !-->
</template>

<script setup>
import { ref } from "vue";
import TranslateIcon from "@/assets/translate.svg";

const langs = [
  { code: "en-US", text: "English" },
  { code: "fr-CA", text: "Francais" }
];

const active = ref(false);
const toggle = () => (active.value = !active.value);
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
