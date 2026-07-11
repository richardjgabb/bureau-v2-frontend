import { useState } from "react";
import { useGameState } from "../../../pages/GamePage/useGameState";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner"
import SecondaryButton from "../../Atoms/SecondaryButton/SecondaryButton";
import OuterModal from "../../Molecules/OuterModal/OuterModal"
import EditGameForm from "../../Molecules/EditGameForm/EditGameForm";

const EditGameModal = () => {

    const { state, dispatch } = useGameState();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [removedPlayers, setRemovedPlayers] = useState<object>({});

    const closeModal = () => {
        setShowModal(!showModal);
    }

    const openModal = () => {
        setShowModal(true);
    }

    const handleCloseModalButton = () => {
        dispatch({ type: 'SET_DATA', payload: { ...state.data, players: { ...state.data.players, ...removedPlayers } } });
        setRemovedPlayers({});
        setShowModal(false);
    }

    return (
        <>
            {!showModal && <SecondaryButton text={'Edit Game'} onClick={openModal} type="button"/>}
            {showModal &&
                <OuterModal setShowModal={handleCloseModalButton}>
                    {state.loading && <LoadingSpinner />}
                    {state.error && <ErrorSpan message={state.error} />}
                    <EditGameForm setShowModal={closeModal} removedPlayers={removedPlayers} setRemovedPlayers={setRemovedPlayers}/>
                </OuterModal>}
        </>
    )
}

export default EditGameModal