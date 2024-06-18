<template>
  <div class="header">
    <span />
    <h2 class="title">{{ $t("title") }}</h2>
    <div class="controlContainer">
      <SettingsButton />
      <TimerToggle />
      <LocaleSwitcher />
      <DarkModeToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsButton from "@/components/controls/SettingsButton.vue";
import TimerToggle from "@/components/controls/TimerToggle.vue";
import LocaleSwitcher from "@/components/controls/LocaleSwitcher.vue";
import DarkModeToggle from "@/components/controls/DarkModeToggle.vue";
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
