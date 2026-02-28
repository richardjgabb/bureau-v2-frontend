import { forwardRef } from "react"
import ErrorSpan from "../ErrorSpan/ErrorSpan"
import InputLabel from "../InputLabel/InputLabel"
import type { InputProps } from "../../../PropTypes"
import ColumnContainer from "../ColumnContainer/ColumnContainer"

const TextBox = forwardRef<HTMLInputElement, InputProps>(({ id, label, placeholder, max, min, required, errors, ...props }, ref) => {

    return (
        <ColumnContainer>
            {label && <InputLabel label={label} htmlFor={id}/>}
            <input
                id={id}
                ref={ref}
                { ...props }
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder={placeholder}
                maxLength={max}
                minLength={min}
                required={required}
            />
            { errors && <ErrorSpan message={errors} /> }
        </ColumnContainer>
    )
})

export default TextBox
