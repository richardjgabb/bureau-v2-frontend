import apiRequest from "../../ApiClient/ApiClient";

export const postUndo = async (gameId: number, round: number): Promise<any> => {
    const response = await apiRequest(`scores/${gameId}/round/${round}`, {
        method: 'DELETE',
        // credentials: 'include',
    });
    if (!response.ok) {
        let errMsg = 'Failed to delete round';
        const errorData = await response.json();
        if (errorData.message) {
            errMsg = errorData.message;
        }
        throw new Error(errMsg, { cause: response.status });
    }
    const result = await response.json();
    return result.data;
};
