export const takeBuyIns = (players, buyIn) => {
    return Object.fromEntries(
        Object.entries(players).map(([key, player]) => [
            Number(key),
            player.frozen ? player : {
                ...player,
                current_score: player.current_score -= buyIn
            }
        ])
    );
};

export const replaceBuyIns = (players, buyIn) => {
    return Object.fromEntries(
        Object.entries(players).map(([key, player]) => [
            Number(key),
            player.frozen ? player : {
                ...player,
                current_score: player.current_score += buyIn
            }
        ])
    );
};