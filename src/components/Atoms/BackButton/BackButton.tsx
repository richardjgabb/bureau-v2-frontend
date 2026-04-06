import UndoIcon from "../Icons/UndoIcon"
import type { BackButtonProps } from "./types"

const BackButton = ({ onClick }: BackButtonProps) => {
    return (
        <button className="px-4 py-2 rounded bg-white/80 text-black hover:cursor-pointer duration-300 hover:scale-105 w-fit flex gap-2 justify-center items-center"
            onClick={onClick}>
            <UndoIcon />
            Undo
        </button>
    )
}
export default BackButton
