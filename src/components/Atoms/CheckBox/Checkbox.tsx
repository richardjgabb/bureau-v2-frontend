import { forwardRef, useState } from "react"
import type { InputProps } from "../TextBox/types"
import ErrorSpan from "../ErrorSpan/ErrorSpan"

const CheckBox = forwardRef<HTMLInputElement, InputProps>(({ id, label, checked, errors, ...props }, ref) => {

    const [isChecked, setIsChecked] = useState(checked);

    return (
        <label htmlFor={id} className={`flex flex-col gap-1 border rounded-lg justify-center cursor-pointer select-none px-4 py-3 ${
                isChecked ? "bg-purple border-purple" : "bg-black/40 border-white/20"
                }`}>
            <span className="font-medium text-lg text-center">{ label }</span>
            <input
                id={id}
                name={id}
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="hidden"
                ref={ref}
                { ...props }
            />
            <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                isChecked ? "bg-purple border-purple" : "border-white/60"
                }`}
            >
                {isChecked && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                )}
            </div>
            { errors && <ErrorSpan message={errors} /> }
        </label>
    )
})

export default CheckBox
