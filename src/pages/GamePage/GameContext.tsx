import { createContext, useEffect, useReducer } from 'react';
import type { GameContextType, GamePageAction, GamePageState, GameProviderProps } from './types';
import { useParams } from 'react-router-dom';
import { fetchGameData } from '../../hooks/fetch/fetchScore';

const initialState = {
  data: {},
  error: null,
  loading: false,
};

const reducer = (state: GamePageState, action: GamePageAction) => {
  switch (action.type) {
    case 'SET_POT_WINNER':
      return {
        ...state,
        data: {
          ...state.data,
          potWinnerId: action.payload,
          players: {
            ...state.data.players,
            [action.payload]: {
              ...state.data.players[action.payload],
              result: 'win'
            }
          }
        }
      };
      case 'SET_SAFE':
      return {
        ...state,
        data: {
          ...state.data,
          players: {
            ...state.data.players,
            [action.payload]: {
              ...state.data.players[action.payload],
              result: 'safe'
            }
          }
        }
      };
    case 'SET_BUED':
      return {
        ...state,
        data: {
          ...state.data,
          players: {
            ...state.data.players,
            [action.payload]: {
              ...state.data.players[action.payload],
              result: 'bued'
            }
          },
          buedIds: state.data.buedIds && state.data.buedIds.includes(action.payload) ? state.data.buedIds : [...(state.data.buedIds || []), action.payload]
        }
      };
    case 'SET_DEALER':
      return { ...state, data: { ...state.data, dealerId: action.payload }};
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'RESET_ROUND':
      return { ...state, data: { ...state.data, potWinnerId: null, dealerId: null }}
    case 'SET_PLAYERS':
      return { ...state, data: { ...state.data, players: action.payload }}
    case 'SET_ALL_SAFE':
        return { ...state, data: { ...state.data, players: action.payload }}
    case 'UPDATE_POT_SIZE':
        return { ...state, data: { ...state.data, currentPotSize: action.payload }}
    case 'SET_OUT':
        return {
          ...state,
          data: {
            ...state.data,
            players: {
              ...state.data.players,
              [action.payload.id]: {
                ...state.data.players[action.payload.id],
                isIn: false
              }
            }
          }
        };
    case 'SET_IN':
      return {
        ...state,
        data: {
          ...state.data,
          players: {
            ...state.data.players,
            [action.payload.id]: {
              ...state.data.players[action.payload.id],
              isIn: true
            }
          }
        }
      };
      case 'TOGGLE_FROZEN':
        return { ...state, data: state.data?.players.map((player) =>
          player.id === action.payload.id
            ? { ...player, frozen: !player.frozen }
            : player
        ), };
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
    const result = await fetchGameData(Number(gameId));
    dispatch({ type: 'SET_DATA', payload: result });
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