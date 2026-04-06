import type { CloseButtonProps } from "./types"

const CloseButton = ({ setState }: CloseButtonProps) => {
    return (
        <button className="absolute z-100 text-xl font-bold p-4 right-6 top-6 text-white bg-purple hover:bg-purple/60 rounded-lg w-8 h-8 flex items-center justify-center hover:cursor-pointer shadow-lg"
            onClick={() => setState(false)}>
            X
        </button>
    )
}
export default CloseButton
