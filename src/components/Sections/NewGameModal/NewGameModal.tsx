import OuterModal from "../../Molecules/OuterModal/OuterModal.tsx"
import NewGameSelect from "../NewGame/NewGameSelect.tsx"
import type { NewGameModalProps } from "./types"

const NewGameModal = ({ setShowModal }: NewGameModalProps) => {
    return (
        <OuterModal setShowModal={() => setShowModal(false)}>
            <div className="w-full bg-gray-800 p-4 rounded-lg flex flex-col gap-2 items-center">
                <h2 className="text-2xl text-white font-bold p-2">New Game</h2>
                <NewGameSelect />
            </div>
        </OuterModal>
    )
}
export default NewGameModal
