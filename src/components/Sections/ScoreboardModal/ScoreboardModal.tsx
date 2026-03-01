import { useGameState } from "../../../pages/GamePage/useGameState.ts";
import OuterModal from "../../Molecules/OuterModal/OuterModal.tsx";
import type { ScoreboardModalProps } from "./types.ts";

const ScoreboardModal = ({ setShowScoreboard }: ScoreboardModalProps) => {

    const { state } = useGameState();

    return (
        <OuterModal setShowModal={() =>setShowScoreboard(false)}>
            <section className="bg-white/40 p-4 rounded-lg w-full h-fit">
                <table className="w-full border-2 border-white/10">
                    <thead>
                        <tr className="text-white">
                            {state.data?.players && state.data.players.map(player => (
                                <th key={player.id} className="p-2">
                                    {player.name}
                                </th>
                            ))}
                            <th>
                                Pot
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.data?.pots && state.data.pots.map((pot, index: number) => (
                            <tr className="text-white" key={'row' + index}>
                                {state.data?.players && state.data.players.map(player => (
                                    <td key={player.id + index} className="text-center px-2 py-1">
                                        { player.scores[index]?.score ? `£${(player.scores[index]?.score/100).toFixed(2)}` : '-' }
                                    </td>
                                ))}
                                <td key={'pot' + index} className="text-center px-2 py-1">
                                    { pot.pot }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </OuterModal>
    )
}
export default ScoreboardModal
