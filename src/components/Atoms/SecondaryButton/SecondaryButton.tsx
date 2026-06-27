import type { PrimaryButtonProps } from "../PrimaryButton/types"

const SecondaryButton = ({ text, onClick, type = 'button', icon }: PrimaryButtonProps) => {

    return (
        <button className={'flex gap-2 justify-center items-center px-4 py-2 rounded bg-black/60 text-white hover:cursor-pointer duration-300 hover:bg-purple/60 hover:scale-105 w-fit'} type={type} onClick={onClick}>
            {icon && icon}
            {text}
        </button>
    )
}

export default SecondaryButton
