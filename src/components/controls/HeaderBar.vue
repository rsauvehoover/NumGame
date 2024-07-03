<template>
  <div :class="$style.header">
    <span />
    <h2 :class="$style.title">{{ $t("title") }}</h2>
    <div :class="$style.controlContainer">
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

<style module>
.header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  border: 2px solid var(--color-border);
  padding: 0.3rem 3rem 0.3rem 3rem;
}

.title {
  font-weight: 500;
  grid-column: 2;
  justify-self: center;
  line-height: 200%;
  text-align: center;
}

.controlContainer {
  display: flex;
  column-gap: 0.5rem;
  grid-column: 3;
  justify-self: end;
}

@media (max-width: 950px) {
  .header {
    grid-template-columns: auto 1fr 1fr;
  }
}

@media (max-width: 650px) {
  .header {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 35px;
  }

  .title {
    grid-row: 1;
    grid-column: 1;
    font-size: 1rem;
  }

  .controlContainer {
    grid-row: 2;
    grid-column: 1;
    justify-self: center;
  }
}
</style>
