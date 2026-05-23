import { useForm } from "react-hook-form";
import { useGameState } from "../../../pages/GamePage/useGameState";
import PrimaryButton from "../../Atoms/PrimaryButton/PrimaryButton";
import MainHeader from "../../Atoms/MainHeader/MainHeader";
import BinButton from "../../Atoms/BinButton/BinButton";

const EditGameForm = () => {

    const { state, dispatch } = useGameState();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    //TODO Handle submit
    const onSubmit = data => console.log(data);

    const players = Object.values(state.data.players) ?? []
    const removePlayer = (id: string) => {
        const { [id]: deleted, ...remaining } = state.data.players;
        return remaining;
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <MainHeader text="Edit Game" />
            <div className="flex flex-row gap-2 p-2 justify-between text-white">
                <label className="">Name:</label>
                <label className="w-1/4">Score:</label>
            </div>
            {players.map((player) => (
                <div key={player.id} className="flex flex-row p-1 w-[100%] gap-2 justify-between">
                    <input className="bg-dark-gray p-2 rounded flex-grow" defaultValue={player.name} {...register(player.id + 'name')} />
                    <div className="flex flex-row w-1/3 gap-1">
                        <input className=" w-3/4 bg-dark-gray p-2 rounded" defaultValue={player.current_score} {...register(player.id + 'score')} />
                        <BinButton onClick={() => dispatch({ type: 'REMOVE_PLAYER', payload: removePlayer(player.id) })} disabled={false}/>
                    </div>
                </div>
            ))}
            {errors.exampleRequired && <span className="text-red-500">This field is required</span>}
            <div className="flex items-center justify-center">
                <PrimaryButton type="submit" text="Save changes"/>
            </div>
        </form>
    )
}

export default EditGameForm