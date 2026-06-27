import type { TableRowProps } from "./types"

const TableRow = ({ children }: TableRowProps) => {
    return (
        <tr className="flex justify-between bg-dark-gray px-4 py-4 rounded-lg hover:bg-white/40 transition-colors duration-400">
            { children }
        </tr>
    )
}
export default TableRow
