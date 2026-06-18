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

export const updatePotSize = (potSize: number, isWinner: boolean, amountOfBues: number) => {
    const newPot = isWinner ? 0 : potSize
    return amountOfBues > 0 ? newPot + (amountOfBues * potSize) : newPot;
}
