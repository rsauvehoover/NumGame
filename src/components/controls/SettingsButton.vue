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
    onClose() {
      close();
    }
  },
  slots: {
    default: "<p>The content of the modal</p>"
  }
});
</script>
