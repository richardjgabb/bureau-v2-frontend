import type { BackButtonProps } from "./types"

const BackButton = ({ onClick }: BackButtonProps) => {
    return (
        <button className="absolute p-4 -right-2 -top-4 z-10 text-white bg-purple hover:bg-purple/60 rounded-full w-10 h-10 flex items-center justify-center hover:cursor-pointer shadow-lg hover:scale-110 duration-300"
            onClick={onClick}>
            ↩
        </button>
    )
}
export default BackButton
