interface PlayerEntry {
    id: number;
    name: string;
    score: number | string;
}

export type FormValues = {
  players: PlayerEntry[];
  buyIn: number;
  gameName: string;
}
