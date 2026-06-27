import { forwardRef } from "react"
import ErrorSpan from "../ErrorSpan/ErrorSpan"
import InputLabel from "../InputLabel/InputLabel"
import type { InputProps } from "../../../PropTypes"
import ColumnContainer from "../ColumnContainer/ColumnContainer"

const NumberInput = forwardRef<HTMLInputElement, InputProps>(({ id, label, placeholder, max, min, required, errors, ...props }, ref) => {

    return (
        <ColumnContainer>
            {label && <InputLabel label={label} htmlFor={id}/>}
            <input
                id={id}
                ref={ref}
                { ...props }
                type="number"
                className="w-20 px-3 py-2 bg-white/20 rounded-lg outline-none shadow-sm"
                placeholder={placeholder}
                max={max}
                min={min}
                required={required}
            />
            { errors && <ErrorSpan message={errors} /> }
        </ColumnContainer>
    )
})

export default NumberInput
