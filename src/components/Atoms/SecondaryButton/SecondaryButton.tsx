import type { PrimaryButtonProps } from "../PrimaryButton/types"

const SecondaryButton = ({ text, onClick, type = 'button', icon }: PrimaryButtonProps) => {

    return (
        <button className={'flex min-w-[120px] gap-2 justify-center items-center px-4 py-2 rounded bg-white/10 text-white hover:cursor-pointer duration-300 hover:bg-purple/60 hover:scale-105 w-fit'} type={type} onClick={onClick}>
            {icon && icon}
            {text}
        </button>
    )
}

export default SecondaryButton
