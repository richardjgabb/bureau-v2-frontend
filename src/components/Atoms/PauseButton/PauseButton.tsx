import { setPlayerFrozen } from "../../../hooks/setPlayers";
import { useGameState } from "../../../pages/GamePage/useGameState";
import PauseIcon from "../Icons/PauseIcon"

const PauseButton = ({ playerId }) => {

    const { state, dispatch } = useGameState();

    const handleClick = (e) => {
        e.stopPropagation()
        freezePlayer();
    }

    const freezePlayer = () => {
        dispatch({ type: 'SET_FROZEN', payload: setPlayerFrozen(state.data.players, playerId, true) });
    }

    return (
        <>
        {state.data?.currentPotSize === 0 && <button className="p-1 absolute right-2 top-2 rounded bg-dark-blue text-white hover:cursor-pointer hover:scale-105"
            onClick={handleClick}
        >
            <PauseIcon />
        </button>}
        </>
    )
}

export default PauseButton