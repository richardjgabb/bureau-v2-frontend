import type { ErrorSpanProps } from "./types"

const ErrorSpan = ({ message }: ErrorSpanProps) => {

    return (
        <span className="text-red-500 ml-2">{message}</span>
    )
}

export default ErrorSpan