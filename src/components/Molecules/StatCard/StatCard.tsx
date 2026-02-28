import ContentCard from '../../Atoms/ContentCard/ContentCard';
import type { StatCardProps } from './types';

const StatCard = ({ children}: StatCardProps) => {

    return (
        <ContentCard className={"w-[45vw] md:w-[28vw] lg:w-[22vw] bg-purple"}>
            { children }
        </ContentCard>
    )
}

export default StatCard
