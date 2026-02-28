import type { InputLabelProps } from "./types"

const InputLabel = ({ label, htmlFor }: InputLabelProps) => {

    return (
        <label className="text-white/70" htmlFor={htmlFor}>
            {label}
        </label>
    )
}

export default InputLabel
