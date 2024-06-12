import { defineStore } from "pinia";

// Possibly switch this out to somethign eldse? Set of pre-defined colour themes?
export interface ColourTheme {
  background: string;
  text: string;
}

export interface Settings {
  min: number;
  max: number;
  language: string;
  // font? Dyslexic font maybe?
  // colourTheme
  // timer:
}

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({})
});
