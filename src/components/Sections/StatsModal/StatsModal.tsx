import { useGameState } from "../../../pages/GamePage/useGameState";
import type { Player } from "../../../PropTypes";
import RowContainer from "../../Atoms/RowContainer/RowContainer";
import OuterModal from "../../Molecules/OuterModal/OuterModal";
import PlayerStatsCard from "../../Molecules/PlayerStatsCard/PlayerStatsCard";
import type { StatsModalProps } from "./types";

const StatsModal = ({ setShowStats }: StatsModalProps) => {

    const { state } = useGameState();
    return (
        <OuterModal setShowModal={() =>setShowStats(false)}>
            <RowContainer>
                {state.data?.players && Object.values(state.data.players).map((player: Player) => (
                    <PlayerStatsCard
                        key={player.id}
                        name={player.name}
                        stats={player.stats[0]}
                    />
                ))}
            </RowContainer>
        </OuterModal>
    )
}
export default StatsModal
