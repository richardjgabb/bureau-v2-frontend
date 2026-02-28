import { useGameState } from "../../../pages/GamePage/useGameState";
import type { Player } from "../../../PropTypes";
import RowContainer from "../../Atoms/RowContainer/RowContainer";
import PlayerStatsCard from "../../Molecules/PlayerStatsCard/PlayerStatsCard";

const StatsModal = () => {

    const { state } = useGameState();
    return (
        <RowContainer>
            {state.data?.players && state.data.players.map((player: Player) => (
                <PlayerStatsCard
                    key={player.id}
                    name={player.name}
                    stats={player.stats[0]}
                />
            ))}
        </RowContainer>
    )
}
export default StatsModal
