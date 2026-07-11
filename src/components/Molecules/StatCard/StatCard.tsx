import ContentCard from '../../Atoms/ContentCard/ContentCard';

const StatCard = ({ children }) => {

    return (
        <ContentCard className={"w-[42vw] md:w-[28vw] lg:w-[22vw] bg-purple"}>
            { children }
        </ContentCard>
    )
}

export default StatCard
