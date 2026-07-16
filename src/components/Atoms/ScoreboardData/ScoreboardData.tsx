const ScoreboardData = ({ data, isPotWinner = false }) => {

    return (
        <td className={"text-center px-2 py-1 text-xs" + (isPotWinner ? " text-red-300 font-bold" : " text-green-200")} >
            { data }
        </td>
    )
}

export default ScoreboardData