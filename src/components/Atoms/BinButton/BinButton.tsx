import DeleteIcon from "../Icons/DeleteIcon"

const BinButton = ({ onClick, disabled }) => {
    return (
        <button className={'px-2 py-1 rounded bg-red-700 text-white hover:cursor-pointer hover:scale-105 duration-300 hover:bg-red-600/60 w-fit flex gap-2 justify-center items-center'} onClick={onClick} disabled={disabled}>
            <DeleteIcon />
        </button>
    )
}
export default BinButton