import { useEffect } from "react";
import { useGameState } from "../../../pages/GamePage/useGameState.ts";
import OuterModal from "../../Molecules/OuterModal/OuterModal.tsx";
import type { ScoreboardModalProps } from "./types.ts";
import { fetchScoreboardData } from "../../../hooks/fetch/fetchScoreboard.ts";
import { poundConversion } from "../../../hooks/poundConversion.ts";
import ScoreboardData from "../../Atoms/ScoreboardData/ScoreboardData.tsx";
import ScoreboardHeader from "../../Atoms/ScoreboardHeader/ScoreboardHeader.tsx";
import LoadingSpinner from "../../Atoms/LoadingSpinner/LoadingSpinner.tsx";
import ErrorSpan from "../../Atoms/ErrorSpan/ErrorSpan.tsx";

const ScoreboardModal = ({ cachedRound, setCachedRound, setShowScoreboard }: ScoreboardModalProps) => {

    const { state, dispatch } = useGameState();

    const fetchData = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const result = await fetchScoreboardData(Number(state.data?.id));
        dispatch({ type: 'SET_SCOREBOARD', payload: result });
    }

    useEffect(() => {
        if (cachedRound === state.data?.round) {
            return
        }
        fetchData();
        setCachedRound(state.data?.round ?? 1);
    }, [])

    return (
        <OuterModal setShowModal={() =>setShowScoreboard(false)}>
            <section className="bg-white/40 p-4 rounded-lg w-full h-fit overflow-x-scroll">
                {state.loading && <LoadingSpinner />}
                {state.error && <ErrorSpan message={state.error} />}
                {!(state.error) && <table className="w-full border-2 border-white/10">
                    <thead>
                        <tr className="text-white">
                            <ScoreboardHeader text="Round" />
                            {state.data?.players && Object.values(state.data.players).map(player => (
                                <ScoreboardHeader key={player.id} text={player.name} />
                            ))}
                            <ScoreboardHeader text={'Pot'} />
                        </tr>
                    </thead>
                    <tbody>
                        {state.data?.scoreboard && Object.values(state.data?.scoreboard).map((round, index: number) => (
                            <tr className="text-white" key={'row' + index}>
                                <ScoreboardData data={round.round} key={'round' + round.round} />
                                {Object.keys(state.data.players).map(player => (
                                    <ScoreboardData data={ round.scores[player] ? poundConversion(round.scores[player]) : '-' } key={'player_' + player + 'round_' + round.round} />
                                ))}
                                <ScoreboardData data={ poundConversion(round.pot) } key={'pot' + round.pot} />
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </section>
        </OuterModal>
    )
}

export default ScoreboardModal
