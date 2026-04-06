import type { Player } from "../PropTypes"

export const setAllPlayersSafe = (players: { [key: number]: Player }) => {
    return Object.keys(players).reduce((acc, key) => {
        acc[key] = { ...players[key], result: 'safe' };
        return acc;
      }, {});
}