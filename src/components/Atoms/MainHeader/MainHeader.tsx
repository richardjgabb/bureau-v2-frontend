import type { MainHeaderProps } from "./types"

const MainHeader = ({ text, className='', ...rest }: MainHeaderProps) => {

    const baseClasses: string = "text-purple font-semibold w-fit text-center m-auto py-2 px-4 rounded text-4xl";
    const mergedClasses: string = `${ baseClasses } ${ className }`.trim();

    return (
        <h1 className={ mergedClasses } { ...rest}>
            { text }
        </h1>
    )
}

export default MainHeader
