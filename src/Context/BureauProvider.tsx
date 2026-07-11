import { createContext, useReducer } from "react";

const BureauContext = createContext({});

interface BureauState {
    games: [] | null;
    players: [] | null;
    stats: object | null;
    loading: boolean;
    error: string | null
}

interface BureauAction {
    type: string;
    payload: any;
}

const initialState = {
    games: null,
    players: null,
    stats: null,
    loading: false,
    error: null
  };

const reducer = (state: BureauState, action: BureauAction) => {
    switch(action.type) {
        case 'SET_GAMES':
            return { ...state, games: action.payload }
        case 'SET_STATS':
            return { ...state, stats: action.payload }
        case 'SET_PLAYERS':
            return { ...state, players: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_ERROR':
            return { ...state, error: action.payload }
        case 'ADD_PLAYER':
            return { ...state, players: [...state.players, action.payload] }
        case 'ADD_GAME':
            return { ...state, games: [...state.games, action.payload] }
        default:
            return state
    }
}

const BureauProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BureauContext.Provider value={{ state, dispatch }}>
            {children}
        </BureauContext.Provider>
    )
}

export { BureauContext, BureauProvider }