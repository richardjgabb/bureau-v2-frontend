import { useState } from "react"
import apiRequest from "../ApiClient/ApiClient"

interface Player {
    id: number
    name: string
}

export const useAvailablePlayers = () => {

    const [availablePlayers, setAvailablePlayers] = useState<Player[]>([])

    const fetchAvailablePlayers = async (gameId: number) => {
        const response = await apiRequest(`games/${gameId}/availablePlayers`);
        if (!response.ok) {
            let errMsg = 'Failed to fetch available players';
            const errorData = await response.json();
            if (errorData.message) {
                errMsg = errorData.message;
            }
            throw new Error(errMsg, { cause: response.status });
        }
        const result = await response.json();
        setAvailablePlayers(result.data);
        return result.data;
    }

    return {
        availablePlayers,
        setAvailablePlayers,
        fetchAvailablePlayers
    }
}