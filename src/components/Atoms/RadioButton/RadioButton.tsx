import { forwardRef } from "react"
import ErrorSpan from "../ErrorSpan/ErrorSpan"
import type { InputProps } from "./types"

const RadioButton = forwardRef<HTMLInputElement, InputProps>(({ id, label, checked, errors, onClick, ...props }, ref) => {

    return (
        <label htmlFor={id} className={`flex flex-col rounded-lg border items-center gap-2 justify-center cursor-pointer select-none px-1 py-2 w-[27%] ${
                checked ? "bg-purple border-purple" : "bg-zinc-950 border-white/20"
                }`}
                onClick={onClick}>
            <span className="font-medium text-md text-center">{ label }</span>
            <input
                id={id}
                name={id}
                type="radio"
                checked={checked}
                readOnly
                className="hidden"
                ref={ref}
                { ...props }
            />
            <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                checked ? "bg-purple border-purple" : "border-white/60"
                }`}
            >
                {checked && (
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

export default RadioButton
