export interface ICurrentItem {
  x: string;
  y: string;
}

export type ICell = {
  status: string,
  cellCounter: string,
  [key:string]: string
}

export interface IGameMap {
  [key:string]: [ICell];
}

export interface ICurrentItem {
  x: string;
  y: string;
}
