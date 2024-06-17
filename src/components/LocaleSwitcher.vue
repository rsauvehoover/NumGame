<template>
  <IconButton @onClick="toggle" :icon="TranslateIcon" />
  <!-- <select class="langSelect" v-model="$i18n.locale">
    <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
      {{ lang.text }}
    </option>
    </select>
    !-->
</template>

<script setup lang="ts">
import { ref } from "vue";
import TranslateIcon from "@/assets/translate.svg";
import IconButton from "@/components/IconButton.vue";

const langs = [
  { code: "en-US", text: "English" },
  { code: "fr-CA", text: "Francais" }
];

const active = ref(false);
const toggle = () => (active.value = !active.value);
</script>
