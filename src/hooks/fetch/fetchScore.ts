interface Score {
    id: number;
}

export const fetchGameData = async (gameId: number) => {
    const response = await fetch(import.meta.env.VITE_API_URL + `games/${gameId}`);
    if (!response.ok) {
        let errMsg = 'Failed to fetch game data';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
};

export const postScore = async (gameId: number, data: object): Promise<Score> => {
    const response = await fetch(import.meta.env.VITE_API_URL + `scores/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        let errMsg = 'Failed to submit round';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
};
