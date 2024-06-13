import { defineStore } from "pinia";

const SETTINGS_LOCAL_STORAGE_KEY = "settings";

export interface Range {
  min: number;
  max: number;
}

export enum Mode {
  dark = "dark",
  light = "light"
}

export enum Language {
  en = "en",
  fr = "fr"
}

export interface Settings {
  range: Range;
  language: Language;
  mode: Mode;
  timer: boolean;
  dyslexicFont: boolean;
}

const getDefaultSettings = (): Settings => ({
  range: {
    min: 5,
    max: 10
  },
  timer: false,
  language: Language.en,
  mode: Mode.dark,
  dyslexicFont: false
});

const getSettings = () => {
  const settings = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY);

  return settings ? JSON.parse(settings) : getDefaultSettings();
};

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({ settings: getSettings() }),
  actions: {
    updateSettings(partialSettings: Partial<Settings>) {
      this.settings = {
        ...this.settings,
        ...partialSettings
      };

      localStorage.setItem(SETTINGS_LOCAL_STORAGE_KEY, JSON.stringify(this.settings));
    },
    setRange(range: Range) {
      this.updateSettings({ range });
    },
    setMode(mode: Mode) {
      this.updateSettings({ mode });
    },
    setLangauge(language: Language) {
      this.updateSettings({ language });
    },
    toggleTimer() {
      this.updateSettings({ timer: !this.settings.timer });
    },
    toggleDyslexicFont() {
      this.updateSettings({ dyslexicFont: !this.settings.dyslexicFont });
    }
  },
  getters: {
    range(): Range {
      return this.settings.range;
    },
    mode(): Mode {
      return this.settings.mode;
    },
    language(): Language {
      return this.settings.language;
    },
    timerActive(): boolean {
      return this.settings.timer;
    },
    dyslexicFontActive(): boolean {
      return this.settings.dyslexicFont;
    }
  }
});
