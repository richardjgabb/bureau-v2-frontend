import ContentHeader from "../../Atoms/ContentHeader/ContentHeader"
import ContentText from "../../Atoms/ContextText/ContextText"
import type { PlayerStatsCardProps } from "./types"

const PlayerStatsCard = ({ name, stats }: PlayerStatsCardProps) => {
    return (
            <div className="flex flex-col bg-dark-blue px-6 py-4 rounded-xl">
                <ContentHeader text={name}/>
                {stats && Object.keys(stats).map(statKey => (
                    <div key={statKey} className="flex flex-row justify-between gap-4">
                        <ContentText text={statKey} />
                        <ContentText text={stats[statKey]?.toString()} />
                    </div>
                ))
                }
                </div>
    )
}
export default PlayerStatsCard
