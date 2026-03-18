import { useState } from "react"
import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner"
import MainHeader from "../../components/Atoms/MainHeader/MainHeader"
import PrimaryButton from "../../components/Atoms/PrimaryButton/PrimaryButton"
import RowContainer from "../../components/Atoms/RowContainer/RowContainer"
import SecondaryButton from "../../components/Atoms/SecondaryButton/SecondaryButton"
import PlayerCard from "../../components/Molecules/PlayerCard/PlayerCard"
import StatsModal from "../../components/Sections/StatsModal/StatsModal"
import type { Player } from "../../PropTypes"
import { useGameState } from "./useGameState"
import ScoreboardModal from "../../components/Sections/ScoreboardModal/ScoreboardModal"
import MomentumModal from "../../components/Sections/MomentumModal/MomentumModal"
import { postScore } from "../../hooks/fetch/fetchScore"
import { replaceBuyIns, takeBuyIns } from "../../hooks/buyIns"
import BackButton from "../../components/Atoms/BackButton/BackButton"
import { postUndo } from "../../hooks/fetch/postUndo"
import { setAllPlayersSafe } from "../../hooks/setPlayers"

const GameSection = () => {

    const { state, dispatch } = useGameState();
    const [showStats, setShowStats] = useState(false);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [showMomentum, setShowMomentum] = useState(false);
    const [showResultButtons, setShowResultButtons] = useState(false)
    const handleSubmit = () => {
        if (!showResultButtons) {
            // TODO WHY IS PLAYERS BECOMING AN ARRAY AGAIN?
            dispatch({ type: 'SET_PLAYERS', payload: takeBuyIns(state.data.players, state.data.buyIn) })
            dispatch({ type: 'SET_ALL_SAFE', payload: setAllPlayersSafe(state.data.players) })
            setShowResultButtons(true)
            return
        }
        dispatch({ type: 'SET_LOADING', payload: true })
        postScore(state.data?.id, state.data)
        dispatch({ type: 'SET_LOADING', payload: false })
    }

    const handleBackButton = () => {
        if (showResultButtons) {
            dispatch({ type: 'SET_PLAYERS', payload: replaceBuyIns(state.data.players, state.data.buyIn) })
            setShowResultButtons(false)
            return
        }
        dispatch({ type: 'SET_LOADING', payload: true })
        postUndo(state.data?.id, state.data.round - 1)
        dispatch({ type: 'SET_LOADING', payload: false })
    }

    return (
        <section className="flex flex-col gap-4 transition-all duration-300">
            <MainHeader text={state.data ? state.data.name : 'Game'} />
            {state.loading && <LoadingSpinner />}
            {state.error && <ErrorSpan message={state.error} />}
            {!!(!showStats && !showScoreboard) && <><RowContainer><BackButton onClick={handleBackButton} />
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
            {showStats && <StatsModal />}
            {showScoreboard && <ScoreboardModal setShowScoreboard={setShowScoreboard}/>}
            <RowContainer>
                <PrimaryButton text={'Submit'} onClick={handleSubmit} type="button"/>
                <SecondaryButton text={'Scoreboard'} onClick={() => {setShowScoreboard(!showScoreboard)}} type="button"/>
                <SecondaryButton text={'Momentum'} onClick={() => {setShowMomentum(!showMomentum)}} type="button"/>
                <SecondaryButton text={'Edit Game'} onClick={() => {}} type="button"/>
                <SecondaryButton text={showStats ? 'Show Game': 'Show Stats'} onClick={() => setShowStats(!showStats)} type="button"/>
            </RowContainer>
            {showMomentum && <MomentumModal setShowMomentum={setShowMomentum} />}
        </section>
    )
}
export default GameSection
