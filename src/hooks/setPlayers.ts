import type { Player } from "../PropTypes"

export const setAllPlayersSafe = (players: { [key: number]: Player }) => {
    return Object.keys(players).reduce((acc, key) => {
        acc[key] = { ...players[key], result: 'safe' };
        return acc;
      }, {});
}

export const updatePlayerScores = (
  players: Record<number, Player>,
  updates: Record<number, number>
): Record<number, Player> => {
  return Object.fromEntries(
    Object.entries(players).map(([key, player]) => [
      Number(key),
      {
        ...player,
        current_score:
          updates[Number(key)] ?? player.current_score,
      },
    ])
  )
}
