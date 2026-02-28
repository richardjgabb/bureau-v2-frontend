import CloseButton from "../../Atoms/CloseButton/CloseButton"
import type { OuterModalProps } from "./types"


const OuterModal = ({ children, setShowModal }: OuterModalProps) => {
    return (
        <div className="w-full h-full flex justify-center absolute p-4 bg-black fixed top-0 left-0 z-50">
            <CloseButton setState={setShowModal} />
            {children}
        </div>
    )
}
export default OuterModal
