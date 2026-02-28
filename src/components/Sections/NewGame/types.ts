interface PlayerEntry {
    name: string;
    score: number | string;
}

export type FormValues = {
  players: PlayerEntry[];
  buyIn: number;
}
