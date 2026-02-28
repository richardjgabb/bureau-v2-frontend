import type { TextSectionProps } from "./types";

const TextSection = ({ content, className='', ...rest }: TextSectionProps) => {

    const baseClasses: string = "px-4 py-2"
    const mergedClasses: string = `${ baseClasses } ${ className }`.trim()

    return (
        <p className={ mergedClasses } { ...rest}>
            { content }
        </p>
    )
}

export default TextSection;
