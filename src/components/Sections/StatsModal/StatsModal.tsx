import { useEffect, useState } from "react";
import { useGameState } from "../../../pages/GamePage/useGameState";
import type { Player } from "../../../PropTypes";
import RowContainer from "../../Atoms/RowContainer/RowContainer";
import OuterModal from "../../Molecules/OuterModal/OuterModal";
import PlayerStatsCard from "../../Molecules/PlayerStatsCard/PlayerStatsCard";
import type { StatsModalProps } from "./types";
import { fetchGameStatsData } from "../../../hooks/fetch/fetchStats";
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan";
import StatCard from "../../Molecules/StatCard/StatCard";
import ContentHeader from "../../Atoms/ContentHeader/ContentHeader";
import ContentNumber from "../../Atoms/ContentNumber/ContentNumber";
import Toggle from "../../Atoms/Toggle/Toggle";

const StatsModal = ({ cachedStats, setCachedStats, setShowStats }: StatsModalProps) => {

    const { state, dispatch } = useGameState();
    const [showPlayerStats, setShowPlayerStats] = useState(false);

    const fetchData = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const result = await fetchGameStatsData(Number(state.data?.id));
        dispatch({ type: 'SET_STATS', payload: result });
    }

    useEffect(() => {
        if (cachedStats === state.data?.round) {
            return
        }
        fetchData();
        setCachedStats(state.data?.round ?? 1);
    }, [])

    const gameStats = state.data?.stats?.gameStats;
    const playerStats = state.data?.stats?.playerStats;

    return (
        <OuterModal setShowModal={() =>setShowStats(false)}>
            {state.loading && <LoadingSpinner />}
            {state.error && <ErrorSpan message={state.error} />}
            <section className="flex flex-col gap-4">
                <Toggle
                    leftText="Game Stats"
                    rightText="Player Stats"
                    setState={setShowPlayerStats}/>
            {!showPlayerStats && <RowContainer>
                {gameStats && Object.keys(gameStats).map(stat =>
                    <StatCard key={stat}>
                        <ContentHeader text={stat} />
                        <ContentNumber value={gameStats[stat]} />
                    </StatCard>
                )}
            </RowContainer>}
            {showPlayerStats && <div className="relative flex flex-row gap-2 py-2 flex-wrap justify-center w-full">
                {state.data?.players && Object.values(state.data.players).map((player: Player) => (
                    <PlayerStatsCard
                        key={player.id}
                        name={player.name}
                        stats={playerStats[player.id]}
                    />
                ))}
            </div>}
            </section>
        </OuterModal>
    )
}
export default StatsModal
