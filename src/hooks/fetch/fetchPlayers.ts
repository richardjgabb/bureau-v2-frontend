export const addNewPlayer = async (data: object) => {
    const response = await fetch(import.meta.env.VITE_API_URL + `players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
