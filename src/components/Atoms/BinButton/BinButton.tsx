import DeleteIcon from "../Icons/DeleteIcon"

const BinButton = ({ onClick, disabled }) => {
    return (
        <button className={'p-2 rounded bg-error text-white hover:cursor-pointer hover:scale-105 duration-300 hover:bg-red-600/60 w-fit flex gap-2 justify-center items-center'} onClick={onClick} disabled={disabled} type="button">
            <DeleteIcon />
        </button>
    )
}
export default BinButton