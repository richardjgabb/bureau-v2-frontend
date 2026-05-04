export const fetchGameStatsData = async (gameId: number) => {
    const response = await fetch(import.meta.env.VITE_API_URL + `games/${gameId}/stats`);
    if (!response.ok) {
        let errMsg = 'Failed to fetch game stats';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
};
