
import MainHeader from "../components/Atoms/MainHeader/MainHeader"
import TableRow from "../components/Atoms/TableRow/TableRow"
import { useFetch } from "../hooks/useFetch"
import type { ApiResponse } from "./GamePage/types"
import LoadingSpinner from "../components/Atoms/LoadingSpinner/LoadingSpinner"
import ErrorSpan from "../components/Atoms/ErrorSpan/ErrorSpan"
import { poundConversion } from "../hooks/poundConversion"
import PrimaryButton from "../components/Atoms/PrimaryButton/PrimaryButton"
import { useContext, useEffect, useState } from "react"
import NewGameModal from "../components/Sections/NewGameModal/NewGameModal"
import AddIcon from "../components/Atoms/Icons/AddIcon"
import { BureauContext } from "../Context/BureauProvider"
import { Link } from "react-router-dom"
import { fetchAllGames } from "../hooks/fetch/fetchGame"

const GamesPage = () => {

    const [newGame, setNewGame] = useState(false)
    const { state, dispatch } = useContext(BureauContext);

    const fetchGames = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const result = await fetchAllGames();
            dispatch({ type: 'SET_GAMES', payload: result });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    useEffect(() => {
        if (!state.games) {
            fetchGames();
        }
    }, [state.games])

    return (
            <section className="flex flex-col gap-4 items-center">
                <MainHeader text="Games"/>
                {state.loading && <LoadingSpinner />}
                {state.error && <ErrorSpan message={state.error} />}
                <PrimaryButton text={'New Game'} onClick={ () => setNewGame(true)} type="button" icon={<AddIcon />}/>
                {!newGame && <table className="w-full">
                    <tbody className="flex flex-col gap-2">
                        {state.games && state.games.map(game =>
                                <TableRow key={game.name}>
                                    <td className="w-full h-full flex items-center">
                                        <Link className="hover:cursor-pointer flex items-center justify-between w-full h-full" to={`/games/${game.id}`}>
                                            <div>
                                                <p>{game.name}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <p>Current Pot: {poundConversion(game.current_pot)}</p>
                                                <p>Buy In: {poundConversion(game.buy_in)}</p>
                                            </div>
                                        </Link>
                                    </td>
                                </TableRow>
                        )}
                    </tbody>
                </table>}
                {newGame &&
                    <NewGameModal setShowModal={setNewGame} />
                }
            </section>
    )
}

export default GamesPage
