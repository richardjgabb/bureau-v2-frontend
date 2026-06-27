import type { PrimaryButtonProps } from "../PrimaryButton/types"

const TertiaryButton = ({ text, onClick, icon }: PrimaryButtonProps) => {
    return (
        <button className="flex gap-2 justify-center items-center px-4 py-2 rounded bg-white/80 text-black hover:cursor-pointer duration-300 hover:scale-105 w-fit flex gap-2 justify-center items-center"
            onClick={onClick}>
            {icon && icon}
            {text}
        </button>
    )
}
export default TertiaryButton
