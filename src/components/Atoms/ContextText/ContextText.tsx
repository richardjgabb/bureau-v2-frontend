import type { ContentTextProps } from "./types"

const ContentText = ({ text }: ContentTextProps) => {
    return (
        <p className="font-medium text-xs text-center text-white/70 lg:text-md">
            { text }
        </p>
    )
}
export default ContentText