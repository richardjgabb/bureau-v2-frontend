import type { PrimaryButtonProps } from "../PrimaryButton/types"

const SecondaryButton = ({ text, onClick, type = 'button' }: PrimaryButtonProps) => {

    return (
        <button className={'px-4 py-2 rounded bg-black/60 text-white hover:cursor-pointer duration-300 hover:bg-blue-300 w-fit'} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

export default SecondaryButton
