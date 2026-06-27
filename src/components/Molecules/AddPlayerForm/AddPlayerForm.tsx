import { useForm } from "react-hook-form";
import AddButton from "../../Atoms/AddButton/AddButton";
import MainHeader from "../../Atoms/MainHeader/MainHeader";
import { addNewPlayer } from "../../../hooks/fetch/fetchPlayers";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan";
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner";

const AddPlayerForm = ({ toggleModal }) => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<{ name: string }>();

    const onSubmit = async (data: { name: string }) => {
        try {
            await addNewPlayer(data);
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
            className="flex flex-col h-fit gap-2 items-center bg-white/40 rounded-lg px-10 py-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MainHeader text="Add Player" />
            <label className="text-white">Player Name:</label>

            <input
                className="w-full p-2 rounded-md text-white bg-white/20 border border-white/20"
                type="text"
                placeholder="Enter name..."
                {...register("name", { required: "Player name is required" })}
            />

            {isSubmitting && <LoadingSpinner />}
            {errors.name && <ErrorSpan message={errors.name.message} />}
            {errors.root?.serverError && <ErrorSpan message={errors.root.serverError.message} />}

            {!isSubmitting && <AddButton text="Add Player" type='submit' />}
        </form>
    )
}

export default AddPlayerForm;