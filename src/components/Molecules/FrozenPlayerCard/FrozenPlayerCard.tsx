import { useGameState } from "../../../pages/GamePage/useGameState"
import ContentCardMedium from "../../Atoms/ContentCard/ContentCardMedium"
import ContentHeader from "../../Atoms/ContentHeader/ContentHeader"
import PlayButton from "../../Atoms/PlayButton/PlayButton"

interface PlayerCardProps {
    playerName: string
    playerId: number
}

const FrozenPlayerCard = ({ playerName, playerId }: PlayerCardProps) => {

    const { state } = useGameState();

    return (
            <ContentCardMedium>
                <div className="flex flex-col gap-4 items-center">
                    <div className="opacity-20">
                        <ContentHeader text={playerName}/>
                        <p className="text-2xs text-center">
                            This player is frozen - you can unfreeze on compulsory rounds
                        </p>
                    </div>
                    {state.data?.currentPotSize === 0 && <PlayButton playerId={playerId} />}
                </div>
            </ContentCardMedium>
    )
}

export default FrozenPlayerCard