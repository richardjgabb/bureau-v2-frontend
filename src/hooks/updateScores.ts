export const updateScores = (players, currentPotSize) => {
    return Object.fromEntries(
        Object.entries(players).map(([key, player]) => [
            Number(key),
            player.result === 'win' ? {
                ...player,
                current_score: player.current_score += currentPotSize
            } :
            player.result === 'bued' ? {
                ...player,
                current_score: player.current_score -= currentPotSize
            }
            : player
        ])
    );
}
