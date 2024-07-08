import { defineStore } from "pinia";
import { type Tile, type Timer, TileState } from "@/stores/game.types";

interface State {
  board: Record<string, Tile>;
  timer: Timer;
  hand: number[];
}

export const useGameStore = defineStore({
  id: "game",
  state: (): State => ({
    board: {} as Record<string, Tile>,
    timer: { on: false, start: new Date(), elapsed: new Date(0) },
    hand: []
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
    },
    setTileState(id: string, state: TileState) {
      this.board[id].state = state;
    }
  },
  getters: {
    timerOn(): boolean {
      return this.timer.on;
    }
  }
});
