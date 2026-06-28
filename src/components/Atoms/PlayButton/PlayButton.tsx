import { setPlayerFrozen } from "../../../hooks/setPlayers";
import { useGameState } from "../../../pages/GamePage/useGameState";
import PlayIcon from "../Icons/PlayIcon";

const PlayButton = ({ playerId }) => {

    const { state, dispatch } = useGameState();

    const handleClick = (e) => {
        e.stopPropagation()
        unfreezePlayer();
    }

    const unfreezePlayer = () => {
        dispatch({ type: 'SET_FROZEN', payload: setPlayerFrozen(state.data.players, playerId, false) });
    }

    return (
        <button className="p-2 rounded bg-dark-blue text-white hover:cursor-pointer hover:scale-105 w-fit"
            onClick={handleClick}
        >
            <PlayIcon />
        </button>
    )
}

export default PlayButton