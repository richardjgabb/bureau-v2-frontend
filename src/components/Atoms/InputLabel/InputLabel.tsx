import type { InputLabelProps } from "./types"

const InputLabel = ({ label, htmlFor }: InputLabelProps) => {

    return (
        <label className={"font-semibold"} htmlFor={htmlFor}>
            {label}
        </label>
    )
}

export default InputLabel
