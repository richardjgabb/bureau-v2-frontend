import type { PrimaryButtonProps } from "./types"

const PrimaryButton = ({ text, onClick, type = 'button' }: PrimaryButtonProps) => {

    return (
        <button className={'px-4 py-2 rounded bg-dark-blue text-white hover:cursor-pointer hover:bg-blue-300 w-fit'} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

export default PrimaryButton
