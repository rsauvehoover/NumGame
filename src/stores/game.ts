import { defineStore } from "pinia";

export enum TileState {
  Inactive,
  Active,
  Complete,
  Display
}

// TODO: Board tiles shouldn't necessarily show the value when completed (only for Display?)
// That way when cards are dragged onto the board they can be left (with drop shadows etc as if a card was placed on a play area)

export interface Tile {
  state: TileState;
  value: number;
  row: number;
  col: number;
}

export interface Timer {
  on: boolean;
  start: Date;
  elapsed: Date;
}

export const useGameStore = defineStore({
  id: "game",
  state: () => ({
    board: [] as Tile[],
    timer: { on: false, start: new Date(), elapsed: new Date(0) } as Timer
  }),
  actions: {
    startTimer() {
      if (!this.timer.on) {
        this.timer = { on: true, start: new Date(), elapsed: new Date(0) };
      }
    },
    timerRefresh() {
      this.timer.elapsed = new Date(new Date().getTime() - this.timer.start.getTime());
    },
    stopTimer() {
      this.timer.on = false;
    }
  },
  getters: {
    timerOn(): boolean {
      return this.timer.on;
    }
  }
});
