import { createContext, useEffect, useReducer } from 'react';
import type { GameContextType, GamePageAction, GamePageState, GameProviderProps } from './types';
import { useParams } from 'react-router-dom';

const initialState = {
  potWinnerId: 0,
  dealerId: 0,
  data: {},
  error: null,
  loading: false,
};

const reducer = (state: GamePageState, action: GamePageAction) => {
  switch (action.type) {
    case 'SET_POT_WINNER':
      return { ...state, potWinnerId: action.payload };
    case 'SET_DEALER':
      return { ...state, dealerId: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_OUT':
      return { ...state, data: state.data?.players.map((player) =>
        player.id === action.payload.id
          ? { ...player, isIn: false }
          : player
      ), }
    default:
      return state;
  }
};

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: GameProviderProps) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { gameId } = useParams();

  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await fetch(`${apiUrl}games/${gameId}`);
    if (!response.ok) {
      const errorText = `Error: ${response.status} ${response.statusText}`;
      dispatch({ type: 'SET_ERROR', payload: errorText });
      return;
    }
    const result = await response.json();
    dispatch({ type: 'SET_DATA', payload: result.data });
  }

  useEffect(() => {
    fetchData();
  }, [gameId, apiUrl]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};