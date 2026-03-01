export const postUndo = async (gameId: number, round: number): Promise<any> => {
    const response = await fetch(import.meta.env.VITE_API_URL + `scores/${gameId}/round/${round}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
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
