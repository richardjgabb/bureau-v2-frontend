export const takeBuyIns = (players, buyIn) => {
    return Object.fromEntries(
        Object.entries(players).map(([key, player]) => [
            Number(key),
            player.isFrozen ? player : {
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
            player.isFrozen ? player : {
                ...player,
                current_score: player.current_score += buyIn
            }
        ])
    );
};

export const updatePotSizeFromBuyIns = (currentSize, players, buyIn) => {
    const livePlayers = players.filter(player => !player.isFrozen);
    return currentSize + (livePlayers.length * buyIn);
}

export const replacePotSizeFromBuyIns = (currentSize, players, buyIn) => {
    const livePlayers = players.filter(player => !player.isFrozen);
    return currentSize - (livePlayers.length * buyIn);
}