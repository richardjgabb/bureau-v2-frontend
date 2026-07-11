export const updateScores = (players: object, currentPotSize: number, winnerId: number, buedIds: []) => {
    return Object.fromEntries(
        Object.entries(players).map(([key, player]) => [
            Number(key),
            Number(key) === winnerId ? {
                ...player,
                current_score: player.current_score += currentPotSize
            } :
            buedIds.includes(Number(key)) ? {
                ...player,
                current_score: player.current_score -= currentPotSize
            }
            : player
        ])
    );
}

export const updatePotSize = (potSize: number, isWinner: boolean, amountOfBues: number) => {
    if (isWinner && amountOfBues === 0) return 0

    const newPot = isWinner ? 0 : potSize
    return amountOfBues > 0 ? newPot + (amountOfBues * potSize) : newPot;
}

export const isRoundCompuls = (pot: number, buyIn: number, amountOfPlayersIn: number) => {
    return pot < (buyIn * amountOfPlayersIn);
}
