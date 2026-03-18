export const takeBuyIns = (players, buyIn) => {
    return Object.values(players).map(player => (
        player.frozen ? player :
        {
            ...player,
            current_score: player.current_score -= buyIn
        }
    ))
}

export const replaceBuyIns = (players, buyIn) => {
    return Object.values(players).map(player => (
        player.frozen ? player :
        {
            ...player,
            current_score: player.current_score += buyIn
        }
    ))
}
