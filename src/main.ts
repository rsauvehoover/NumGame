import "./assets/main.css";
import "vue-final-modal/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { createVfm } from "vue-final-modal";
import App from "@/App.vue";

import enUS from "@/locales/en-US.json";
import frCA from "@/locales/fr-CA.json";

const i18n = createI18n({
  legacy: false,
  locale: "en-US",
  fallbackLocale: "en-US",
  messages: { "en-US": enUS, "fr-CA": frCA }
});

const vfm = createVfm();

const app = createApp(App);

app.use(i18n);
app.use(vfm);
app.use(createPinia());

app.mount("#app");
