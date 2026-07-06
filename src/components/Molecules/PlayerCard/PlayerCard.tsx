import ContentCardMedium from "../../Atoms/ContentCard/ContentCardMedium"
import ContentHeader from "../../Atoms/ContentHeader/ContentHeader"
import ContentText from "../../Atoms/ContextText/ContextText"
import DealIcon from "../../Atoms/DealIcon/DealIcon"
import ResultRadioButtons from "../ResultRadioButtons/ResultRadioButtons"
import type { PlayerCardProps } from "./types"
import { useGameState } from "../../../pages/GamePage/useGameState"
import InOutRadioButtons from "../InOutRadioButtons/InOutRadioButtons"
import PauseButton from "../../Atoms/PauseButton/PauseButton"
import FrozenPlayerCard from "../FrozenPlayerCard/FrozenPlayerCard"

const PlayerCard = ({ playerName, playerId, playerScore, showResultButtons }: PlayerCardProps) => {

    const { state, dispatch } = useGameState();

    const handleClick = () => {
        dispatch({ type: 'SET_DEALER', payload: playerId });
    }

    const playerFrozen = state.data.players?.[playerId]?.isFrozen

    return (
        <>
        {playerFrozen && <FrozenPlayerCard playerName={playerName} playerId={playerId} />}
        {!playerFrozen && <div onClick={handleClick}
            className={(state.data.dealerId === playerId ? "bg-dark-blue " : "bg-white/10 ") + "rounded-xl hover:cursor-pointer relative"}
        >
            <ContentCardMedium>
                {state.data.dealerId === playerId && <DealIcon />}
                <PauseButton playerId={playerId} />
                <div className="flex flex-col">
                    <ContentHeader text={playerName}/>
                    <ContentText text={`£${(playerScore/100).toFixed(2).toString()}`} />
                </div>
                {!showResultButtons && <InOutRadioButtons playerId={playerId}/>}
                {showResultButtons && <ResultRadioButtons playerId={playerId} />}
            </ContentCardMedium>
        </div>}
        </>
    )
}

export default PlayerCard
