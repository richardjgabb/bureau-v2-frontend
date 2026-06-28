import ContentCard from './ContentCard';
import type { ContentCardProps } from './types';

const ContentCardMedium = ({ children, className }: ContentCardProps) => {

    return (
        <ContentCard className={"w-[42vw] md:w-[28vw] lg:w-[22vw] " + className}>
            { children }
        </ContentCard>
    )
}

export default ContentCardMedium
