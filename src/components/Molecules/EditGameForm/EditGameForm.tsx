import { useForm } from "react-hook-form";
import { useGameState } from "../../../pages/GamePage/useGameState";
import PrimaryButton from "../../Atoms/PrimaryButton/PrimaryButton";
import MainHeader from "../../Atoms/MainHeader/MainHeader";
import BinButton from "../../Atoms/BinButton/BinButton";
import { updateGameData } from "../../../hooks/fetch/fetchGame";
import AvailablePlayersDropdown from "../../Atoms/AvailablePlayersDropdown/AvailablePlayersDropdown";

const EditGameForm = ({ setShowModal }) => {

    const { state, dispatch } = useGameState();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await updateGameData(state.data.id, state.data.round - 1, data);

            dispatch({ type: 'UPDATE_GAME', payload: data });
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

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <MainHeader text="Edit Game" />
            <div className="flex flex-col gap-2 p-2 justify-between">
                <label className="text-light-gray">Game Name:</label>
                <input className="w-full p-2 bg-dark-gray text-light-gray rounded text-lg"
                    defaultValue={state.data.name}
                    {...register("game_name",
                        { required: true }
                    )}
                />
                {errors.game_name && <span className="text-error">{errors.game_name.message}</span>}
            </div>
            <div className="flex flex-col gap-2 p-2 justify-between">
                <label className="text-light-gray">Buy In amount:</label>
                <input className="w-full p-2 bg-dark-gray rounded text-light-gray text-lg"
                    type="number"
                    defaultValue={state.data?.buyIn}
                    {...register("buy_in",
                        { required: true }
                    )}
                />
                {errors.game_name && <span className="text-error">{errors.game_name.message}</span>}
            </div>
            <div className="flex flex-row gap-2 p-2 justify-between">
                <label className="text-light-gray">Player:</label>
                <label className="w-1/4 text-light-gray">Score:</label>
            </div>
            <div className="flex flex-col gap-2">
                {Object.values(state.data.players).map((player) => (
                    <div key={player.id} className="bg-dark-gray rounded-lg p-2">
                        <div className="flex flex-row p-1 w-[100%] gap-2 justify-between items-center">
                            <div className="flex flex-row gap-3 flex-grow items-center">
                                <BinButton onClick={() => dispatch({ type: 'REMOVE_PLAYER', payload: removePlayer(player.id) })}
                                    disabled={false}
                                />
                                <p className="text-xl text-light-gray">{player.name}</p>
                            </div>
                            <input className=" w-1/4 bg-light-gray p-2 rounded"
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
                <div className="flex items-center justify-center">
                    <PrimaryButton type="submit" text="Save changes"/>
                </div>
            </div>
        </form>
    )
}

export default EditGameForm