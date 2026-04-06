import AddIcon from "../Icons/AddIcon"
import PrimaryButton from "../PrimaryButton/PrimaryButton"
import type { AddButtonProps } from "./types"

const AddButton = ({ onClick, text }: AddButtonProps) => {
    return (
        <PrimaryButton text={text} onClick={onClick} type="submit" icon={<AddIcon />} />
    )
}
export default AddButton
