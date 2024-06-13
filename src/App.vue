<template>
  <header>
    <HeaderBar />
    <div>Hello {{ mode }}</div>
  </header>
</template>

<script setup>
import HeaderBar from "@/components/HeaderBar.vue";
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";

const settingStore = useSettingsStore();
const mode = computed(() => settingStore.mode);
</script>
