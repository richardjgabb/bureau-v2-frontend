import MainHeader from "../../Atoms/MainHeader/MainHeader.tsx"
import OuterModal from "../../Molecules/OuterModal/OuterModal.tsx"
import NewGameForm from "../NewGame/NewGameForm.tsx"
import type { NewGameModalProps } from "./types"

const NewGameModal = ({ setShowModal }: NewGameModalProps) => {
    return (
        <OuterModal setShowModal={() => setShowModal(false)}>
            <div className="w-full h-fit bg-dark-gray p-4 rounded-lg flex flex-col gap-2 items-center">
                <MainHeader text={'New Game'} />
                <NewGameForm />
            </div>
        </OuterModal>
    )
}
export default NewGameModal
