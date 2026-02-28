import ContentCardMedium from "../../Atoms/ContentCard/ContentCardMedium"
import ContentHeader from "../../Atoms/ContentHeader/ContentHeader"
import ContentText from "../../Atoms/ContextText/ContextText"
import type { PlayerStatsCardProps } from "./types"

const PlayerStatsCard = ({ name, stats }: PlayerStatsCardProps) => {
    return (
        <ContentCardMedium>
            <div className="flex flex-col">
                <ContentHeader text={name}/>
                {stats && Object.keys(stats).map(statKey => (
                    <div key={statKey} className="flex flex-row justify-between gap-4">
                        <ContentText text={statKey} />
                        <ContentText text={stats[statKey]?.toString()} />
                    </div>
                ))
                }
                </div>
        </ContentCardMedium>
    )
}
export default PlayerStatsCard
