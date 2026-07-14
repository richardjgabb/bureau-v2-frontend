import apiRequest from "../../ApiClient/ApiClient";

export const addNewPlayer = async (data: object) => {
    const response = await apiRequest(`players`, {
        method: 'POST',
        // credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        let errMsg = 'Failed to add new player';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
}

export const fetchAllPlayers = async () => {
    const response = await apiRequest(`players`);
    if (!response.ok) {
        let errMsg = 'Failed to fetch players';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
}
