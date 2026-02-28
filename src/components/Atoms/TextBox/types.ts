export interface InputProps {
    id: string;
    label?: string;
    ref?: React.RefObject<HTMLInputElement>;
    placeholder?: string;
    max?: number;
    min?: number;
    checked?: boolean;
    required?: boolean;
    errors?: string | null;
}