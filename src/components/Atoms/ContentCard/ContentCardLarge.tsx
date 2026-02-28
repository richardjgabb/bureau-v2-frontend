import ContentCard from './ContentCard';
import type { ContentCardProps } from './types';

const ContentCardLarge = ({ children}: ContentCardProps) => {

    return (
        <ContentCard className={"min-w-[80vw]"}>
            { children }
        </ContentCard>
    )
}

export default ContentCardLarge
