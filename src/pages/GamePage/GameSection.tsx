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

const GameSection = () => {

    const { state } = useGameState();
    const [showStats, setShowStats] = useState(false);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [showMomentum, setShowMomentum] = useState(false);

    return (
        <section className="flex flex-col gap-4 transition-all duration-300">
            <MainHeader text={state.data ? state.data.name : 'Game'} />
            {state.loading && <LoadingSpinner />}
            {state.error && <ErrorSpan message={state.error} />}
            {!!(!showStats && !showScoreboard) && <><RowContainer>
            {state.data?.players && state.data.players.map((player: Player) => (
                <PlayerCard
                    key={player.id}
                    playerId={player.id}
                    playerName={player.name}
                    playerScore={player.current_score}
                />
            ))}
            </RowContainer>
            <p className="text-white/80 text-[10px] px-4">ⓘ Click card to assign deal</p></>}
            {showStats && <StatsModal />}
            {showScoreboard && <ScoreboardModal setShowScoreboard={setShowScoreboard}/>}
            <RowContainer>
                <PrimaryButton text={'Submit'} onClick={() => {}} type="button"/>
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
