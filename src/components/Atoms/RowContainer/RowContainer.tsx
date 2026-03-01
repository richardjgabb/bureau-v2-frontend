import type { RowContainerProps } from "./types.ts"

const RowContainer = ({ children }: RowContainerProps) => {
    return (
        <div className="relative flex flex-row gap-2 flex-wrap justify-center w-full">
            {children}
        </div>
    )
}
export default RowContainer
