import type { ButtonTypes } from "../../../PropTypes";

export interface PrimaryButtonProps{
    text: string;
    onClick?: () => void;
    type: ButtonTypes
}