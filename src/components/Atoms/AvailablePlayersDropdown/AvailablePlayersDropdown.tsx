import { useEffect, useState } from "react";
import AddButton from "../AddButton/AddButton";
import { useAvailablePlayers } from "../../../hooks/useAvailablePlayers";
import { useGameState } from "../../../pages/GamePage/useGameState";
import TableRow from "../TableRow/TableRow";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const AvailablePlayersDropdown = () => {

    const { state, dispatch } = useGameState();
    const [showDropdown, setShowDropdown] = useState(false);
    const { availablePlayers, fetchAvailablePlayers, setAvailablePlayers } = useAvailablePlayers();

    const toggleDropdown = () => {
        fetchAvailablePlayers(state.data.id);
        setShowDropdown(!showDropdown);
    }

    const handleAddPlayer = (player) => {
        setAvailablePlayers(availablePlayers.filter(p => p.id !== player.id));
        dispatch({ type: 'ADD_PLAYER', payload: player });
    }

    return (
        <div className="flex flex-col items-center gap-2">
            { showDropdown ? <PrimaryButton text="- Close" onClick={toggleDropdown} type='button' /> :
                <AddButton text="Add player" onClick={toggleDropdown} type='button'/>
            }
            <table>
                <tbody className="flex flex-col gap-2">
                {showDropdown && availablePlayers.map(player =>
                    <TableRow key={player.id}>
                        <td>
                            <button onClick={() => handleAddPlayer(player)} type="button">
                                {player.name}
                                {player.id}
                            </button>
                        </td>
                    </TableRow>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default AvailablePlayersDropdown