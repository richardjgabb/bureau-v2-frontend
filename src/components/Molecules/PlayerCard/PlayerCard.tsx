import ContentCardMedium from "../../Atoms/ContentCard/ContentCardMedium"
import ContentHeader from "../../Atoms/ContentHeader/ContentHeader"
import ContentText from "../../Atoms/ContextText/ContextText"
import DealIcon from "../../Atoms/DealIcon/DealIcon"
import ResultRadioButtons from "../../ResultRadioButtons/ResultRadioButtons"
import type { PlayerCardProps } from "./types"
import { useGameState } from "../../../pages/GamePage/useGameState"

const PlayerCard = ({ playerName, playerId, playerScore }: PlayerCardProps) => {

    const handleClick = () => {
        dispatch({ type: 'SET_DEALER', payload: playerId });
    }

    const { state, dispatch } = useGameState();

    return (
        <div onClick={handleClick}
            className={(state.dealerId === playerId ? "bg-dark-blue " : "") + "rounded-xl hover:cursor-pointer relative"}
        >
            <ContentCardMedium>
                {state.dealerId === playerId && <DealIcon />}
                <div className="flex flex-col">
                    <ContentHeader text={playerName}/>
                    <ContentText text={playerScore} />
                </div>
                <ResultRadioButtons playerId={playerId} />
            </ContentCardMedium>
        </div>
    )
}

export default PlayerCard
