<template>
  <div class="container">
    <IconButton @onClick="open = !open" :icon="TranslateIcon" />
    <div class="items" :class="{ selectHide: !open }">
      <div v-for="(lang, i) of langs" :key="i" @click="handleSelect(lang.code)">
        {{ lang.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore, Language } from "@/stores/settings";
import { useI18n } from "vue-i18n";
import TranslateIcon from "@/assets/translate.svg";
import IconButton from "@/components/shared/IconButton.vue";

const { locale } = useI18n({ useScope: "global" });

const settingsStore = useSettingsStore();
const { language } = storeToRefs(settingsStore);

const langs = [
  { code: Language.en, text: "English" },
  { code: Language.fr, text: "Francais" }
];

const open = ref(false);

const handleSelect = (lang: Language) => {
  settingsStore.setLanguage(lang);
  open.value = false;
};

watchEffect(() => {
  locale.value = language.value;
});
</script>

<style scoped>
.container {
  position: relative;
}

.items {
  background: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  position: absolute;
  z-index: 1;
}

.items div {
  padding: 0.3rem;
  border-radius: 6px;
}

.items div:hover {
  background-color: var(--color-background-mute);
  cursor: pointer;
}

.selectHide {
  display: none;
}
</style>
