import { useState } from "react";
import { useAvailablePlayers } from "../../../hooks/useAvailablePlayers";
import { useGameState } from "../../../pages/GamePage/useGameState";
import AddIcon from "../Icons/AddIcon";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

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
        <div className="flex flex-col items-center gap-2 w-full">
            { showDropdown ? <SecondaryButton text="^" onClick={toggleDropdown} type='button' /> :
                <SecondaryButton text="+ Add existing player" onClick={toggleDropdown} type='button'/>
            }
            <table className=" min-w-[200px]">
                <tbody className="flex flex-col items-center bg-dark-gray rounded">
                {showDropdown && availablePlayers.map((player, index) =>
                    <tr key={player.id} className={"w-full px-4 py-2 shadow-md " + (index !== availablePlayers.length - 1 ? "border-b border-light-gray" : "")}>
                        <td className="w-full flex justify-center text-xl text-light-gray">
                            <button onClick={() => handleAddPlayer(player)} type="button" className="flex items-center gap-2">
                                <AddIcon />
                                {player.name}
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default AvailablePlayersDropdown