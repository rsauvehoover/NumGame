<template>
  <div class="header">
    <span />
    <h2 class="title">{{ $t("title") }}</h2>
    <div class="controlContainer">
      <SettingsModal />
      <LocaleSwitcher />
      <DarkModeToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import SettingsModal from "@/components/SettingsModal.vue";
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  border: 2px solid var(--color-border);
  justify-content: space-between;
  padding: 0.3rem 3rem 0.3rem 3rem;
}

.title {
  color: var(--color-heading);
  font-weight: 500;
}

.controlContainer {
  display: flex;
  column-gap: 0.5rem;
}
</style>
