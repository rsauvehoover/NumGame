<template>
  <IconButton @onClick="open" :icon="SettingsIcon" />
</template>

<script setup lang="ts">
import { useModal } from "vue-final-modal";
import SettingsModal from "@/components/controls/SettingsModal.vue";
import SettingsIcon from "@/assets/settings.svg";
import IconButton from "@/components/shared/IconButton.vue";

const { open, close } = useModal({
  component: SettingsModal,
  attrs: {
    title: "Hello World!",
    onClose() {
      close();
    }
  },
  slots: {
    default: "<p>The content of the modal</p>"
  }
});
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
