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
  en = "en-US",
  fr = "fr-CA"
}

export interface Settings {
  range: Range;
  scale: number;
  numStartingTiles: number;
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
  scale: 1,
  numStartingTiles: 3,
  timer: false,
  language: Language.en,
  mode: Mode.light,
  dyslexicFont: false
});

const initSettings = () => {
  const localSettings = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY);
  let settings: Settings = getDefaultSettings();

  if (!localSettings) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      settings = { ...settings, mode: Mode.light };
    }
  } else {
    settings = JSON.parse(localSettings);
  }

  document.documentElement.setAttribute("data-theme", settings.mode);

  return settings;
};

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({ settings: initSettings() }),
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
    setRangeMin(min: number) {
      this.updateSettings({ range: { min, max: this.settings.range.max } });
    },
    setRangeMax(max: number) {
      this.updateSettings({ range: { min: this.settings.range.min, max } });
    },
    setNumStartingTiles(numStartingTiles: number) {
      this.updateSettings({ numStartingTiles });
    },
    setMode(mode: Mode) {
      document.documentElement.setAttribute("data-theme", mode);
      this.updateSettings({ mode });
    },
    toggleMode() {
      this.setMode(this.settings.mode === Mode.dark ? Mode.light : Mode.dark);
    },
    setLanguage(language: Language) {
      this.updateSettings({ language });
    },
    toggleTimer() {
      this.updateSettings({ timer: !this.settings.timer });
    },
    setDyslexicFont(val: boolean) {
      this.updateSettings({ dyslexicFont: val });
    },
    setScale(val: number) {
      if (val <= 0) return;
      this.updateSettings({ scale: val });
    }
  },
  getters: {
    range(): Range {
      return this.settings.range;
    },
    numStartingTiles(): number {
      return this.settings.numStartingTiles;
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
    },
    scale(): number {
      return this.scale;
    }
  }
});
