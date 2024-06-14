<template>
  <div class="header">
    <span />
    <h2 class="title">{{ $t("title") }}</h2>
    <div class="controlContainer">
      <!-- <img class="icon" :src="SettingsIcon" /> -->
      <LocaleSwitcher />
      <DarkModeToggle />
    </div>
  </div>
</template>

<script setup>
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import SettingsIcon from "@/assets/settings.svg";
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  border: 2px solid var(--color-border);
  justify-content: space-between;
  padding: 0.5rem 4rem 0.5rem 4rem;
}

.title {
  color: var(--color-heading);
  font-weight: 500;
}

.controlContainer {
  display: flex;
  column-gap: 0.5rem;
}

[data-theme="light"] .icon {
  filter: invert(100%);
}
</style>
