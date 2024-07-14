import { defineStore } from "pinia";
import { type Tile, type Timer, TileState } from "@/stores/game.types";
import { type Range } from "@/stores/settings";

interface State {
  hoveredTile: string;
  board: Record<string, Tile>;
  timer: Timer;
  hand: Record<string, number>;
}

const randIntFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useGameStore = defineStore({
  id: "game",
  state: (): State => ({
    hoveredTile: "",
    board: {} as Record<string, Tile>,
    timer: { on: false, start: new Date(), elapsed: new Date(0) },
    hand: {}
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
    },
    setHoveredTile(id: string) {
      if (this.hoveredTile === id) {
        return;
      }
      if (this.hoveredTile === "") {
        this.hoveredTile = id;
        this.board[id].hovered = true;
      } else {
        this.board[this.hoveredTile].hovered = false;
        this.hoveredTile = "";
      }
    },
    initializeBoard(range: Range) {
      for (let i = 0; i < range.min; i++) {
        this.board[`0,${i}`] = { val: i, row: 0, col: i, state: TileState.Active, hovered: false };
      }
      this.generateHand(range);
    },
    getRandomActiveTile(): [string, Tile] {
      const activeTiles = Object.entries(this.board).filter(
        (entry) => entry[1].state === TileState.Active
      );
      return activeTiles[randIntFromRange(0, activeTiles.length - 1)];
    },
    removeFromHand(id: string) {
      delete this.hand[id];
    },
    generateHand(range: Range) {
      this.hand = {};
      // always generate one card that matches an active tile as bad luck mitigation
      const matchIdx = randIntFromRange(range.min, range.max);
      for (let idx = range.min; idx <= range.max; idx++) {
        if (idx === matchIdx) {
          this.hand[idx] = this.getRandomActiveTile()[1].val;
          continue;
        }
        this.hand[idx] = randIntFromRange(range.min, range.max);
      }
    }
  },
  getters: {
    timerOn(): boolean {
      return this.timer.on;
    }
  }
});
