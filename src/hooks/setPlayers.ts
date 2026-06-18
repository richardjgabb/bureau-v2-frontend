import type { Player } from "../PropTypes"

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
