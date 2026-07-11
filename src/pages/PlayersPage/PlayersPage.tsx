import { useContext, useEffect } from "react"
import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner"
import MainHeader from "../../components/Atoms/MainHeader/MainHeader"
import TableRow from "../../components/Atoms/TableRow/TableRow"
import AddPlayerModal from "../../components/Molecules/AddPlayerModal/AddPlayerModal"
import { BureauContext } from "../../Context/BureauProvider"
import { fetchAllPlayers } from "../../hooks/fetch/fetchPlayers"
import { Link } from "react-router-dom"

const PlayersPage = () => {

    const { state, dispatch } = useContext(BureauContext)

    const fetchPlayers = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const result = await fetchAllPlayers();
            dispatch({ type: 'SET_PLAYERS', payload: result });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    useEffect(() => {
        if (!state.players) {
            fetchPlayers();
        }
    }, [state.players])

    return (
        <section className="flex flex-col gap-4 items-center w-full">
            <MainHeader text="Players"/>
            {state.loading && <LoadingSpinner />}
            {state.error && <ErrorSpan message={state.error} />}
            <AddPlayerModal />
            <table className="w-full">
                <tbody className="flex flex-col gap-2">
                    {state.players && state.players.map(player =>
                        <TableRow key={player.name}>
                            <td className="flex items-center w-full">
                                <Link to={'/players/' + player.id} className="hover:cursor-pointer flex items-center justify-between w-full h-full">
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
                                </Link>
                            </td>
                        </TableRow>
                    )}
                </tbody>
            </table>
        </section>
    )
}
export default PlayersPage
