import TickIcon from "../Icons/TickIcon"
import PrimaryButton from "../PrimaryButton/PrimaryButton"
import type { SubmitButtonProps } from "./types"

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
    return (
        <PrimaryButton text="Submit" onClick={onClick} type="submit" icon={<TickIcon />} />
    )
}
export default SubmitButton
