import type { ContentCardProps } from './types';

const ContentCard = ({ children, className='', ...rest }: ContentCardProps) => {

    const baseClasses: string = "text-gray-100 px-1 py-4 rounded-xl shadow-md flex flex-col gap-2 items-center justify-between";
    const mergedClasses: string = `${ baseClasses } ${ className }`.trim()

    return (
        <section className={ mergedClasses } { ...rest }>
            { children }
        </section>
    )
}

export default ContentCard
