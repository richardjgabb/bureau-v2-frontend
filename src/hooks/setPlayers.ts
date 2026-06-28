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

export const setPlayerFrozen = (
  players: Record<number, Player>,
  playerId: number,
  isFrozen: boolean
): Record<number, Player> => {
  return Object.fromEntries(
    Object.entries(players).map(([key, player]) => [
      Number(key),
      Number(key) === playerId ? { ...player, isFrozen: isFrozen } : player,
    ])
  )
}
