import ContentCard from './ContentCard';
import type { ContentCardProps } from './types';

const ContentCardMedium = ({ children}: ContentCardProps) => {

    return (
        <ContentCard className={"w-[42vw] md:w-[28vw] lg:w-[22vw]"}>
            { children }
        </ContentCard>
    )
}

export default ContentCardMedium
