import apiRequest from "../../ApiClient/ApiClient";

export const updateGameData = async (gameId: number, round: number, data: object) => {
    const { game_name, buy_in, ...players } = data;

    const obj = {
    name: game_name,
    buyIn: Number(buy_in),
    round: Number(round),
    players: Object.fromEntries(
        Object.entries(players).map(([key, value]) =>  [Number(key), Number(value)])
    )};

    const response = await apiRequest(`games/${gameId}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        // credentials: 'include',
    });
    if (!response.ok) {
        let errMsg = 'Failed to update game data';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
};

export const fetchAllGames = async () => {
    const response = await apiRequest(`games`);
    if (!response.ok) {
        let errMsg = 'Failed to fetch games';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
}
