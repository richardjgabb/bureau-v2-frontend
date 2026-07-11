import { useForm } from "react-hook-form";
import AddButton from "../../Atoms/AddButton/AddButton";
import MainHeader from "../../Atoms/MainHeader/MainHeader";
import { addNewPlayer } from "../../../hooks/fetch/fetchPlayers";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan";
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner";
import InputLabel from "../../Atoms/InputLabel/InputLabel";
import { useContext } from "react";
import { BureauContext } from "../../../Context/BureauProvider";

const AddPlayerForm = ({ toggleModal }) => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<{ name: string }>();
    const { state, dispatch } = useContext(BureauContext);

    const onSubmit = async (data: { name: string }) => {
        try {
            const result = await addNewPlayer(data);
            dispatch({
                type: "ADD_PLAYER",
                payload: {id: result, name: data.name, wins: 0, bues: 0, games_played: 0 } });
            toggleModal();
        } catch (error) {
            console.error("Form submission failed:", error);
            setError("root.serverError", {
                type: "server",
                message: error.message || "Something went wrong. Please try again."
            });
        }
    }

    return (
        <form
            className="flex flex-col h-fit gap-2 items-center bg-dark-gray rounded-lg px-10 py-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MainHeader text="Add Player" />
            <div className="flex flex-col gap-1 w-full max-w-md">
                <InputLabel htmlFor="name" label="Name:" />
                <input
                    className="w-full p-2 rounded-md bg-white/40 shadow-sm outline-none"
                    type="text"
                    placeholder="Enter name..."
                    {...register("name", { required: "Player name is required" })}
                />
            </div>

            {isSubmitting && <LoadingSpinner />}
            {errors.name && <ErrorSpan message={errors.name.message} />}
            {errors.root?.serverError && <ErrorSpan message={errors.root.serverError.message} />}

            {!isSubmitting && <AddButton text="Add Player" type='submit' />}
        </form>
    )
}

export default AddPlayerForm;