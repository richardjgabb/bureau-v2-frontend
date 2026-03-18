import type { Player } from "../PropTypes"

export const setAllPlayersSafe = (players: { [key: number]: Player }) => {
    return Object.values(players).map(player => (
        {
            ...player,
            result: 'safe'
        }
    ))
}