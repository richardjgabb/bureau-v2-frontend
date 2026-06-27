import { useState } from "react";
import AddButton from "../../Atoms/AddButton/AddButton";
import OuterModal from "../OuterModal/OuterModal"
import AddPlayerForm from "../AddPlayerForm/AddPlayerForm";

const AddPlayerModal = () => {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            {!showModal && <AddButton onClick={toggleModal} text="Add Player" />}
            {showModal &&
                <OuterModal setShowModal={toggleModal}>
                    <AddPlayerForm toggleModal={toggleModal}/>
                </OuterModal>}
        </>
    )
}

export default AddPlayerModal