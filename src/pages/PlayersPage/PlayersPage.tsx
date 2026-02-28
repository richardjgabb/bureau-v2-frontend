import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner"
import MainHeader from "../../components/Atoms/MainHeader/MainHeader"
import TableRow from "../../components/Atoms/TableRow/TableRow"
import { useFetch } from "../../hooks/useFetch"

const PlayersPage = () => {

    const playersURL = import.meta.env.VITE_API_URL + 'players'

    const { data, error, loading } = useFetch<ApiResponse<PlayersData>>(playersURL)

    return (
        <section className="flex flex-col gap-4">
            <MainHeader text="Players"/>
            {loading && <LoadingSpinner />}
            {error && <ErrorSpan message={error.message} />}
            <table>
                <tbody className="flex flex-col gap-2">
                    {data && data.data.map(player =>
                            <TableRow key={player.name}>
                                <td className="flex items-center w-full">
                                    <a href={'/players/' + player.id} className="hover:cursor-pointer flex items-center justify-between w-full h-full">
                                    <p>{player.name}</p>
                                    <div className="flex gap-4">
                                        <div className="flex items-center">
                                            <p>Games played: {player.games_played}</p>
                                        </div>
                                        <div className="flex flex-col items-end self-end gap-1">
                                            <p>Pot wins: {player.wins}</p>
                                            <p>Bues: {player.bues}</p>
                                        </div>
                                    </div>
                                    </a>
                                </td>
                            </TableRow>
                    )}
                </tbody>
            </table>
        </section>
    )
}
export default PlayersPage
