import { useEffect } from "react";
import { useGameState } from "../../../pages/GamePage/useGameState";
import type { Player } from "../../../PropTypes";
import RowContainer from "../../Atoms/RowContainer/RowContainer";
import OuterModal from "../../Molecules/OuterModal/OuterModal";
import PlayerStatsCard from "../../Molecules/PlayerStatsCard/PlayerStatsCard";
import type { StatsModalProps } from "./types";
import { fetchGameStatsData } from "../../../hooks/fetch/fetchStats";

const StatsModal = ({ cachedStats, setCachedStats, setShowStats }: StatsModalProps) => {

    const { state, dispatch } = useGameState();

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

    return (
        <OuterModal setShowModal={() =>setShowStats(false)}>
            //TODO: Add Game stats - they are returned in the api call already
            <RowContainer>
                {state.data?.players && Object.values(state.data.players).map((player: Player) => (
                    <PlayerStatsCard
                        key={player.id}
                        name={player.name}
                        stats={state.data?.stats?.playerStats[player.id]}
                    />
                ))}
            </RowContainer>
        </OuterModal>
    )
}
export default StatsModal
