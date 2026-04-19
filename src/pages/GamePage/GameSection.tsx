import { useState } from "react"
import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner"
import MainHeader from "../../components/Atoms/MainHeader/MainHeader"
import RowContainer from "../../components/Atoms/RowContainer/RowContainer"
import SecondaryButton from "../../components/Atoms/SecondaryButton/SecondaryButton"
import PlayerCard from "../../components/Molecules/PlayerCard/PlayerCard"
import StatsModal from "../../components/Sections/StatsModal/StatsModal"
import type { Player } from "../../PropTypes"
import { useGameState } from "./useGameState"
import ScoreboardModal from "../../components/Sections/ScoreboardModal/ScoreboardModal"
import MomentumModal from "../../components/Sections/MomentumModal/MomentumModal"
import { postScore } from "../../hooks/fetch/fetchScore"
import { replaceBuyIns, takeBuyIns, updatePotSize, replacePotSize } from "../../hooks/buyIns"
import BackButton from "../../components/Atoms/BackButton/BackButton"
import { postUndo } from "../../hooks/fetch/postUndo"
import { setAllPlayersSafe } from "../../hooks/setPlayers"
import SubmitButton from "../../components/Atoms/SubmitButton/SubmitButton"

const GameSection = () => {

    const { state, dispatch } = useGameState();
    const [showStats, setShowStats] = useState(false);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [showMomentum, setShowMomentum] = useState(false);
    const [showResultButtons, setShowResultButtons] = useState(false)
    const handleSubmit = async () => {
        if (!showResultButtons) {
            dispatch({ type: 'SET_PLAYERS', payload: takeBuyIns(state.data.players, state.data.buyIn) })
            dispatch({ type: 'SET_ALL_SAFE', payload: setAllPlayersSafe(state.data.players) })
            dispatch({ type: 'UPDATE_POT_SIZE', payload: updatePotSize(state.data.currentPotSize, Object.values(state.data.players), state.data.buyIn) })
            setShowResultButtons(true)
            return
        }
        dispatch({ type: 'SET_LOADING', payload: true })
        try {
            postScore(state.data?.id, state.data)
            dispatch({ type: 'RESET_ROUND'})
            setShowResultButtons(false)
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : "An unknown error occurred" })
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }

    const handleBackButton = () => {
        if (showResultButtons) {
            dispatch({ type: 'SET_PLAYERS', payload: replaceBuyIns(state.data.players, state.data.buyIn) })
            dispatch({ type: 'UPDATE_POT_SIZE', payload: replacePotSize(state.data.currentPotSize, Object.values(state.data.players), state.data.buyIn) })
            setShowResultButtons(false)
            return
        }
        dispatch({ type: 'SET_LOADING', payload: true })
        postUndo(state.data?.id, state.data.round - 1)
        dispatch({ type: 'SET_LOADING', payload: false })
    }

    console.log(state)

    return (
        <section className="flex flex-col gap-4 transition-all duration-300">
            <MainHeader text={state.data ? state.data.name : 'Game'} />
            {state.loading && <LoadingSpinner />}
            {state.error && <ErrorSpan message={state.error} />}
            <p className="text-white/80 text-[10px] px-4">Round: {state.data?.round}</p>
            <p className="text-white/80 text-[10px] px-4">Pot: {`£${(state.data?.currentPotSize/100).toFixed(2)}`}</p>
            <p className="text-white/80 text-[10px] px-4">Buy in: {`£${(state.data?.buyIn/100).toFixed(2)}`}</p>
            {!!(!showStats && !showScoreboard) && <><RowContainer>
                {state.data?.players && Object.values(state.data.players).map((player: Player) => (
                    <PlayerCard
                        key={player.id}
                        playerId={player.id}
                        playerName={player.name}
                        playerScore={player.current_score}
                        showResultButtons={showResultButtons}
                    />
                ))}
            </RowContainer>
            <p className="text-white/80 text-[10px] px-4">ⓘ Click card to assign deal</p></>}
            {showStats && <StatsModal setShowStats={setShowStats}/>}
            {showScoreboard && <ScoreboardModal setShowScoreboard={setShowScoreboard}/>}
            <RowContainer>
                <SecondaryButton text={'Scoreboard'} onClick={() => {setShowScoreboard(!showScoreboard)}} type="button"/>
                <SecondaryButton text={'Momentum'} onClick={() => {setShowMomentum(!showMomentum)}} type="button"/>
                <SecondaryButton text={'Edit Game'} onClick={() => {}} type="button"/>
                <SecondaryButton text={'Stats'} onClick={() => setShowStats(!showStats)} type="button"/>
            </RowContainer>
            {!showStats &&<RowContainer>
                <SubmitButton onClick={handleSubmit} />
                <BackButton onClick={handleBackButton} />
            </RowContainer>}
            {showMomentum && <MomentumModal setShowMomentum={setShowMomentum} />}
        </section>
    )
}
export default GameSection
