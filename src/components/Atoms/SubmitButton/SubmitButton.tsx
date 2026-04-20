import TickIcon from "../Icons/TickIcon"
import PrimaryButton from "../PrimaryButton/PrimaryButton"
import type { SubmitButtonProps } from "./types"

const SubmitButton = ({ onClick, disabled }: SubmitButtonProps) => {
    return (
        <PrimaryButton text="Submit" onClick={onClick} type="submit" icon={<TickIcon />} disabled={disabled} />
    )
}
export default SubmitButton
