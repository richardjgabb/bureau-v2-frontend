
import MainHeader from "../components/Atoms/MainHeader/MainHeader"
import TableRow from "../components/Atoms/TableRow/TableRow"
import { useFetch } from "../hooks/useFetch"
import type { ApiResponse } from "./GamePage/types"
import LoadingSpinner from "../components/Atoms/LoadingSpinner/LoadingSpinner"
import ErrorSpan from "../components/Atoms/ErrorSpan/ErrorSpan"
import { poundConversion } from "../hooks/poundConversion"
import PrimaryButton from "../components/Atoms/PrimaryButton/PrimaryButton"
import { useState } from "react"
import NewGameModal from "../components/Sections/NewGameModal/NewGameModal"
import AddIcon from "../components/Atoms/Icons/AddIcon"

const GamesPage = () => {

    const { data, error, loading } = useFetch<ApiResponse<GamesData>>(import.meta.env.VITE_API_URL + 'games')
    const [newGame, setNewGame] = useState(false)

    return (
            <section className="flex flex-col gap-4 items-center">
                <MainHeader text="Games"/>
                {loading && <LoadingSpinner />}
                {error && <ErrorSpan message={error.message} />}
                <PrimaryButton text={'New Game'} onClick={ () => setNewGame(true)} type="button" icon={<AddIcon />}/>
                {!newGame && <table className="w-full">
                    <tbody className="flex flex-col gap-2">
                        {data && data.data.map(game =>
                                <TableRow key={game.name}>
                                    <td className="w-full h-full flex items-center">
                                        <a className="hover:cursor-pointer flex items-center justify-between w-full h-full" href={`/games/${game.id}`}>
                                            <div>
                                                <p>{game.name}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <p>Current Pot: {poundConversion(game.current_pot)}</p>
                                                <p>Buy In: {poundConversion(game.buy_in)}</p>
                                            </div>
                                        </a>
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
