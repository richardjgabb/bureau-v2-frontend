import { useForm } from "react-hook-form";
import { useGameState } from "../../../pages/GamePage/useGameState";
import PrimaryButton from "../../Atoms/PrimaryButton/PrimaryButton";
import MainHeader from "../../Atoms/MainHeader/MainHeader";
import BinButton from "../../Atoms/BinButton/BinButton";
import { updateGameData } from "../../../hooks/fetch/fetchGame";
import AvailablePlayersDropdown from "../../Atoms/AvailablePlayersDropdown/AvailablePlayersDropdown";
import InputLabel from "../../Atoms/InputLabel/InputLabel";

const EditGameForm = ({ setShowModal, removedPlayers, setRemovedPlayers }) => {

    const { state, dispatch } = useGameState();

    const { register, handleSubmit, unregister, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            setRemovedPlayers({});
            const result = await updateGameData(state.data.id, state.data.round - 1, data);
            dispatch({ type: 'SET_DATA', payload: result });
            setShowModal();
        } catch(err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    const removePlayer = (id: string) => {
        const { [id]: deleted, ...remaining } = state.data.players;
        return remaining;
    }

    const handleRemovePlayer = (playerId: string) => {
        unregister(playerId.toString());
        setRemovedPlayers({...removedPlayers, [playerId]: state.data?.players[playerId]});
        dispatch({ type: 'REMOVE_PLAYER', payload: removePlayer(playerId) });
    };

    return (
        <form className="w-full bg-dark-gray rounded-lg p-4" onSubmit={handleSubmit(onSubmit)}>
            <MainHeader text="Edit Game" />
            <div className="flex flex-col gap-2 p-2 justify-between">
                <InputLabel htmlFor="game_name" label="Game Name:" />
                <input className="grow px-4 py-2 bg-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                    defaultValue={state.data.name}
                    {...register("game_name",
                        { required: true }
                    )}
                />
                {errors.game_name && <span className="text-error">{errors.game_name.message}</span>}
            </div>
            <div className="flex flex-col gap-2 p-2 justify-between">
                <InputLabel htmlFor="buy_in" label="Buy In Amount:" />
                <input className="grow px-4 py-2 bg-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                    type="number"
                    defaultValue={state.data?.buyIn}
                    {...register("buy_in",
                        { required: true }
                    )}
                />
                {errors.game_name && <span className="text-error">{errors.game_name.message}</span>}
            </div>
            <div className="flex flex-row gap-2 p-2 justify-between">
                <label className="font-semibold">Player:</label>
                <label className="w-1/4 font-semibold">Score:</label>
            </div>
            <div className="flex flex-col gap-1">
                {Object.values(state.data.players).map((player) => (
                    <div key={player.id}>
                        <div className="flex flex-row p-1 w-[100%] gap-2 justify-between items-center">
                            <div className="flex flex-row gap-3 flex-grow items-center">
                                <BinButton onClick={() => handleRemovePlayer(player.id)}
                                    disabled={false}
                                />
                                <p className="text-xl text-light-gray">{player.name}</p>
                            </div>
                            <input className=" w-1/4 bg-light-gray p-2 rounded bg-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                                type="number"
                                defaultValue={player.current_score ?? 0}
                                {...register((player.id).toString(),
                                    { required: "Current score is required" }
                                )}
                            />
                        </div>
                        {errors[player.id] && <span className="text-error p-1">{errors[player.id].message}</span>}
                    </div>
                ))}
                <div className="flex items-center justify-center">
                    <AvailablePlayersDropdown />
                </div>
                <div className="flex items-center justify-center pb-8">
                    <PrimaryButton type="submit" text="Save changes"/>
                </div>
            </div>
        </form>
    )
}

export default EditGameForm