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

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    board: []
  })
});
