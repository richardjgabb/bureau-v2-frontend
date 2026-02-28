import ContentCard from './ContentCard';
import type { ContentCardProps } from './types';

const ContentCardSmall = ({ children}: ContentCardProps) => {

    return (
        <ContentCard className={"min-w-[20vw]"}>
            { children }
        </ContentCard>
    )
}

export default ContentCardSmall
