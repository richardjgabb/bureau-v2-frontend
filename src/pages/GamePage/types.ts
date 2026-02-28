import type { Dispatch } from "react";
import type { Player } from "../../PropTypes";

export interface ApiResponse {
    message: string;
    status: number;
    data: GameData;
    error: string;
}

export interface GameData {
    id: number;
    name: string;
    latest_score: number;
    players: Player[];
    pots: [];
}

export interface GamePageState {
    potWinnerId: number;
    dealerId: number;
    data?: {players: Player[], name: string} | null;
    error: string | null;
    loading: boolean;
}

export type GamePageAction =
    | { type: 'SET_POT_WINNER' | 'SET_DEALER'; payload: number; }
    | {type: 'SET_DATA'; payload: object; }
    | {type: 'SET_ERROR'; payload: string; }
    | {type: 'SET_LOADING'; payload: boolean; };

export interface GameProviderProps {
    children: React.ReactNode;
}

export interface GameContextType {
    state: GamePageState;
    dispatch: Dispatch<GamePageAction>;
}
