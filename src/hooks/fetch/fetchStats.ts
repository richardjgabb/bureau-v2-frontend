import apiRequest from "../../ApiClient/ApiClient";

export const fetchGameStatsData = async (gameId: number) => {
    const response = await apiRequest(`games/${gameId}/stats`);
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

export const fetchAllTimeStatsData = async () => {
    const response = await apiRequest(`stats`);
    if (!response.ok) {
        let errMsg = 'Failed to fetch stats';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
};

export const fetchAllTimePlayerStats = async (playerId: number) => {
    const response = await apiRequest(`players/${playerId}`);
    if (!response.ok) {
        let errMsg = 'Failed to fetch stats';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
};
