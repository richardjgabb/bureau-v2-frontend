import apiRequest from "../../ApiClient/ApiClient";

interface Score {
    id: number;
}

export const fetchGameData = async (gameId: number) => {
    const response = await apiRequest(`games/${gameId}`);
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
    const response = await apiRequest(`scores/${gameId}`, {
        method: 'POST',
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
