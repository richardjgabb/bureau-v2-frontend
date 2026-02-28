import type { ContentHeaderProps } from "./types"

const ContentHeader = ({ text }: ContentHeaderProps) => {
    return (
        <h2 className="font-bold text-sm text-center text-white/70 lg:text-lg">
            { text }
        </h2>
    )
}
export default ContentHeader
