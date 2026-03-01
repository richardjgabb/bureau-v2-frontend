import type { Player } from "../PropTypes";

export const takeBuyIns = (players: Player[], buyIn: number) => {
    return players.map(player => (
        player.frozen ? player :
        {
            ...player,
            current_score: player.current_score -= buyIn
        }
    ))
}

export const replaceBuyIns = (players: Player[], buyIn: number) => {
    return players.map(player => (
        player.frozen ? player :
        {
            ...player,
            current_score: player.current_score += buyIn
        }
    ))
}
