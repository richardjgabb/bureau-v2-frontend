import type { PrimaryButtonProps } from "./types"

const PrimaryButton = ({ text, onClick, type = 'button', icon = null, disabled = false }: PrimaryButtonProps) => {

    return (
        <button className={'px-4 py-2 rounded bg-dark-blue text-white hover:cursor-pointer hover:scale-105 duration-300 hover:bg-blue-600/60 w-fit flex gap-2 justify-center items-center'} type={type} onClick={onClick} disabled={disabled}>
            {icon && icon}
            {text}
        </button>
    )
}

export default PrimaryButton
