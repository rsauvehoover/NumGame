export interface Timer {
  on: boolean;
  start: Date;
  elapsed: Date;
}

export enum TileState {
  Inactive = "Inactive",
  Active = "Active", // can have a number dropped on it
  Complete = "Complete" // has had the correct number dropped on it, no longer interactable
}

export interface Tile {
  val: number;
  row: number;
  col: number;
  state: TileState;
}
