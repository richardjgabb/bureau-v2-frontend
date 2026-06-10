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
    buyIn: number;
    latest_score: number;
    players: Player[];
    pots: [];
    currentPotSize: number;
    round: number;
    isCompuls?: boolean;
}

export interface GamePageState {
    potWinnerId: number;
    dealerId: number;
    data?: GameData | null;
    error: string | null;
    loading: boolean;
}

export type GamePageAction =
    | {type: 'SET_POT_WINNER' | 'SET_DEALER' | 'SET_SAFE' |'SET_BUED' | 'UPDATE_POT_SIZE'; payload: number; }
    | {type: 'SET_DATA' | 'SET_SCOREBOARD' | 'SET_STATS' | 'REMOVE_PLAYER' | 'ADD_PLAYER' | 'UPDATE_GAME'; payload: object; }
    | {type: 'SET_ERROR'; payload: string; }
    | {type: 'SET_LOADING'; payload: boolean; }
    | {type: 'SET_PLAYERS' | 'SET_ALL_SAFE'; payload: Player[]; }
    | {type: 'SET_OUT' | 'SET_IN' | 'TOGGLE_FROZEN'; payload: {id: number}; }
    | {type: 'RESET_ROUND'; }

export interface GameProviderProps {
    children: React.ReactNode;
}

export interface GameContextType {
    state: GamePageState;
    dispatch: Dispatch<GamePageAction>;
}
