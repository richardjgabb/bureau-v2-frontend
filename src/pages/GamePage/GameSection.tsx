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
import { fetchGameData, postScore } from "../../hooks/fetch/fetchScore"
import { replaceBuyIns, takeBuyIns, updatePotSizeFromBuyIns, replacePotSizeFromBuyIns } from "../../hooks/buyIns"
import { postUndo } from "../../hooks/fetch/postUndo"
import SubmitButton from "../../components/Atoms/SubmitButton/SubmitButton"
import ContentHeader from "../../components/Atoms/ContentHeader/ContentHeader"
import ContentText from "../../components/Atoms/ContextText/ContextText"
import { updatePotSize, updateScores } from "../../hooks/updateScores"
import EditGameModal from "../../components/Sections/EditGameModal/EditGameModal"
import ConfirmationModal from "../../components/Molecules/ConfirmationModal/ConfirmationModal"
import TertiaryButton from "../../components/Atoms/TertiaryButton/TertiaryButton"
import UndoIcon from "../../components/Atoms/Icons/UndoIcon"

const GameSection = () => {

    const { state, dispatch } = useGameState();
    const [showStats, setShowStats] = useState(false);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [showMomentum, setShowMomentum] = useState(false);
    const [showResultButtons, setShowResultButtons] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [cachedScoreboard, setCachedScoreboard] = useState(state.data?.round ?? 0)
    const [cachedStats, setCachedStats] = useState(state.data?.round ?? 0)

    const handleSubmit = async () => {
        if (!showResultButtons) {
            dispatch({ type: 'SET_PLAYERS', payload: takeBuyIns(state.data.players, state.data.buyIn) })
            dispatch({ type: 'UPDATE_POT_SIZE', payload: updatePotSizeFromBuyIns(state.data.currentPotSize, Object.values(state.data.players), state.data.buyIn) })
            setShowResultButtons(true)
            return
        }
        dispatch({ type: 'SET_LOADING', payload: true })
        try {
            dispatch({ type: 'UPDATE_SCORES', payload: updateScores(state.data.players, state.data?.currentPotSize, state.data.potWinnerId, state.data.buedIds) })
            postScore(state.data?.id, state.data)
            dispatch({ type: 'UPDATE_POT_SIZE', payload: updatePotSize(state.data.currentPotSize, state.data.potWinnerId ? true : false, state.data.buedIds?.length ?? 0) })
            dispatch({ type: 'RESET_ROUND'})
            setShowResultButtons(false)
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : "An unknown error occurred" })
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }

    const handleBackButton = async () => {
        if (showResultButtons) {
            dispatch({ type: 'SET_PLAYERS', payload: replaceBuyIns(state.data.players, state.data.buyIn) })
            dispatch({ type: 'UPDATE_POT_SIZE', payload: replacePotSizeFromBuyIns(state.data.currentPotSize, Object.values(state.data.players), state.data.buyIn) })
            setShowResultButtons(false)
            return
        }
        setShowConfirmationModal(true)
    }

    const undoRound = async () => {
        dispatch({ type: 'SET_LOADING', payload: true })
        try {
            await postUndo(state.data?.id, state.data.round - 1)
            const result = await fetchGameData(state.data?.id)
            dispatch({ type: 'SET_DATA', payload: result })
            setShowConfirmationModal(false)
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : "An unknown error occurred" })
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }

    return (
        <section className="flex flex-col gap-4 transition-all duration-300">
            {showConfirmationModal && <ConfirmationModal action={undoRound} setShowConfirmationModal={setShowConfirmationModal} confirmText={'Undo Round'} />}
            <MainHeader text={state.data ? state.data.name : 'Game'} />
            {state.loading && <LoadingSpinner />}
            {state.error && <ErrorSpan message={state.error} />}
            <ContentHeader text={"Pot: £" + (state.data?.currentPotSize/100).toFixed(2)} />
            <div className="flex mx-auto flex-row gap-4 items-between">
                <ContentText text={"Round: " + state.data?.round} />
                <ContentText text={"Buy in: £" +(state.data?.buyIn/100).toFixed(2)} />
            </div>
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
            {showStats && <StatsModal cachedStats={cachedStats} setCachedStats={setCachedStats} setShowStats={setShowStats}/>}
            {showScoreboard && <ScoreboardModal cachedRound={cachedScoreboard} setCachedRound={setCachedScoreboard} setShowScoreboard={setShowScoreboard}/>}
            <RowContainer>
                <SecondaryButton text={'Scoreboard'} onClick={() => {setShowScoreboard(!showScoreboard)}} type="button"/>
                <SecondaryButton text={'Momentum'} onClick={() => {setShowMomentum(!showMomentum)}} type="button"/>
                <SecondaryButton text={'Stats'} onClick={() => setShowStats(!showStats)} type="button"/>
                <EditGameModal />
            </RowContainer>
            {!showStats &&<RowContainer>
                <SubmitButton onClick={handleSubmit} />
                <TertiaryButton text={'Undo'} type={'button'} icon={<UndoIcon />} onClick={handleBackButton} />
            </RowContainer>}
            {showMomentum && <MomentumModal setShowMomentum={setShowMomentum} cachedRound={cachedScoreboard} setCachedRound={setCachedScoreboard}/>}
        </section>
    )
}
export default GameSection
