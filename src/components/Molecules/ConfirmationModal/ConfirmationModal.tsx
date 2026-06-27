import { useState } from "react";
import { useGameState } from "../../../pages/GamePage/useGameState";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner"
import OuterModal from "../../Molecules/OuterModal/OuterModal"
import PrimaryButton from "../../Atoms/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Atoms/SecondaryButton/SecondaryButton";
import TickIcon from "../../Atoms/Icons/TickIcon";

type Props = {
    action: () => void
    setShowConfirmationModal: (arg: boolean) => void
    confirmText?: string
}

const ConfirmationModal = ({ action, setShowConfirmationModal, confirmText }: Props) => {

    const { state, dispatch } = useGameState();

    const closeModal = () => {
        dispatch({ type: 'SET_ERROR', payload: '' });
        setShowConfirmationModal(false);
    }

    return (
        <OuterModal setShowModal={closeModal}>
            <div className="w-full h-fit bg-white/40 rounded-lg p-10 flex flex-col items-center justify-center">
                <h2 className="text-xl text-white font-bold p-2 m-0 text-center">
                    Are you sure you want to undo the last round?
                </h2>
                <p className="text-white/60 font-bold p-2 m-0 text-center">(This action cannot be undone)</p>
                {state.loading && <LoadingSpinner />}
                {state.error && <ErrorSpan message={state.error} />}
                <div className="flex flex-row gap-4 p-4">
                    <PrimaryButton text={confirmText ?? 'Confirm'} onClick={action} type="button" icon={<TickIcon />} />
                    <SecondaryButton text={'Cancel'} onClick={closeModal} type="button" />
                </div>
            </div>
        </OuterModal>
    )
}

export default ConfirmationModal