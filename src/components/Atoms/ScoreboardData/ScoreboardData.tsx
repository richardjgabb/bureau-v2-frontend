const ScoreboardData = ({ data, result = 'safe' }) => {

    const resultMap = {
        'safe': "",
        'win': " text-green-300 font-semibold",
        'bued': " text-red-300 font-semibold"
    }

    return (
        <td className={"text-center px-2 py-1 text-xs" + resultMap[result] } >
            { data }
        </td>
    )
}

export default ScoreboardData