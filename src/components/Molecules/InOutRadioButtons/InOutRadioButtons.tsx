import { useState } from "react"
import RadioButton from "../../Atoms/RadioButton/RadioButton.tsx"
import RowContainer from "../../Atoms/RowContainer/RowContainer.tsx"
import type { InOutRadioButtonsProps } from "./types.ts"
import { useGameState } from "../../../pages/GamePage/useGameState.ts"

const InOutRadioButtons = ({ playerId }: InOutRadioButtonsProps) => {

    const [selected, setSelected] = useState('In')
    const { state, dispatch } = useGameState();

    const handleIn = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.stopPropagation()
        setSelected('In');
        dispatch({ type: 'SET_OUT', payload: { 'id': playerId } });
    }

    const handleOut = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.stopPropagation()
        setSelected('Out');
    }

    return (
        <RowContainer>
            <RadioButton id={playerId + 'In'} label={'In'} checked={selected === "In"} onClick={handleIn}/>
            <RadioButton id={playerId + 'Out'} label={'Out'} checked={selected === "Out"} onClick={handleOut}/>
        </RowContainer>
    )
}

export default InOutRadioButtons
