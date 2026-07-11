import type { ContentTextProps } from "./types"

const ContentText = ({ text }: ContentTextProps) => {
    return (
        <p className="font-medium text-xs text-white/70 lg:text-md">
            { text }
        </p>
    )
}
export default ContentText