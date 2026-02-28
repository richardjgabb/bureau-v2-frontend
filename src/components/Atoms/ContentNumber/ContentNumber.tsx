import type { ContentNumberProps } from "./types"

const ContentNumber = ({ value }: ContentNumberProps) => {
    return (
        <p className="text-3xl font-semibold text-center lg:text-4xl">
            {value}
        </p>
    )
}
export default ContentNumber
