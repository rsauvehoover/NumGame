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
    activateAdjacentTiles(id: string, range: Range) {
      const { row, col } = this.board[id];
      const setActive = (id: string, state: TileState) => {
        if (this.board[id].state === TileState.Inactive) this.setTileState(id, state);
      };
      if (row > range.min) setActive(`${row - 1},${col}`, TileState.Active);
      if (row < range.max) setActive(`${row + 1},${col}`, TileState.Active);
      if (col > range.min) setActive(`${row},${col - 1}`, TileState.Active);
      if (col < range.max) setActive(`${row},${col + 1}`, TileState.Active);
    },
    initializeBoard(range: Range, numActive: number) {
      const coords = [];
      for (let row = range.min; row <= range.max; row++) {
        for (let col = range.min; col <= range.max; col++) {
          coords.push(`${row},${col}`);
        }
      }

      // fisher yates shuffle to grab n random non-colliding starting tiles
      let idx = coords.length;
      while (idx != 0) {
        const randIdx = Math.floor(Math.random() * idx);
        idx--;

        [coords[idx], coords[randIdx]] = [coords[randIdx], coords[idx]];
      }

      this.board = {};
      for (let row = range.min; row <= range.max; row++) {
        for (let col = range.min; col <= range.max; col++) {
          this.board[`${row},${col}`] = {
            val: row * col,
            row: row,
            col: col,
            state: TileState.Inactive,
            hovered: false
          };
        }
      }

      for (const item of coords.slice(0, numActive)) {
        this.setTileState(item, TileState.Active);
      }
      this.generateHand(range);
    },
    getRandomActiveTile(): [string, Tile] | null {
      return this.activeTiles.length
        ? this.activeTiles[randIntFromRange(0, this.activeTiles.length - 1)]
        : null;
    },
    removeFromHand(id: string) {
      delete this.hand[id];
    },
    generateHand(range: Range) {
      this.hand = {};
      // always generate one card that matches an active tile as bad luck mitigation
      const matchIdx = randIntFromRange(range.min, range.max);
      for (let idx = range.min; idx < range.max; idx++) {
        const handValue =
          randIntFromRange(range.min, range.max) * randIntFromRange(range.min, range.max);
        if (idx === matchIdx) {
          const randomTile = this.getRandomActiveTile();
          this.hand[idx] = randomTile ? randomTile[1].val : handValue;
          continue;
        }
        this.hand[idx] = handValue;
      }
    }
  },
  getters: {
    activeTiles(): [string, Tile][] {
      return Object.entries(this.board).filter((entry) => entry[1].state === TileState.Active);
    },
    timerOn(): boolean {
      return this.timer.on;
    }
  }
});
