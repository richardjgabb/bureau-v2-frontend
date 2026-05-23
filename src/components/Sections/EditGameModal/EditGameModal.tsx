import { useState } from "react";
import { useGameState } from "../../../pages/GamePage/useGameState";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner"
import SecondaryButton from "../../Atoms/SecondaryButton/SecondaryButton";
import OuterModal from "../../Molecules/OuterModal/OuterModal"
import EditGameForm from "../../Molecules/EditGameForm/EditGameForm";

const EditGameModal = () => {

    const { state } = useGameState();
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            {!showModal && <SecondaryButton text={'Edit Game'} onClick={toggleModal} type="button"/>}
            {showModal &&
                <OuterModal setShowModal={toggleModal}>
                    {state.loading && <LoadingSpinner />}
                    {state.error && <ErrorSpan message={state.error} />}
                    <EditGameForm />
                </OuterModal>}
        </>
    )
}

export default EditGameModal