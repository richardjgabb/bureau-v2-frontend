import type { InputProps } from "./components/Atoms/TextBox/types";
import type { ErrorSpanProps } from "./components/Atoms/ErrorSpan/types";

type ButtonTypes = 'button' | 'submit' | 'reset';
type InputTypes = 'text' | 'number' | 'select' | 'checkbox';

type Player = {
    id: number;
    name: string;
    scores: [];
    stats: [];
    current_score: number;
    isIn?: boolean;
}

type PlayersArray = {
    players: Player[];
}

export type {
    ButtonTypes,
    ErrorSpanProps,
    Player,
    PlayersArray,
    InputProps,
    InputTypes,
};