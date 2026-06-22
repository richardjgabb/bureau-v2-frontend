import { useState } from "react"
import RadioButton from "../../Atoms/RadioButton/RadioButton.tsx"
import RowContainer from "../../Atoms/RowContainer/RowContainer.tsx"
import type { ResultRadioButtonsProps } from "./types"
import { useGameState } from "../../../pages/GamePage/useGameState.ts"

const ResultRadioButtons = ({ playerId  }: ResultRadioButtonsProps) => {

    const [selected, setSelected] = useState('Safe')
    const { state, dispatch } = useGameState();

    const handleNewPotWinner = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.stopPropagation()
        setSelected('Win');
        dispatch({ type: 'SET_POT_WINNER', payload: playerId });
    }

    const handleSafe = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.stopPropagation()
        setSelected('Safe');
        dispatch({ type: 'SET_SAFE', payload: playerId });
    }

    const handleBued = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.stopPropagation()
        setSelected('Bued');
        dispatch({ type: 'SET_BUED', payload: playerId });
    }

    const defaultToSafe = () => {
        return (selected === 'Safe' && playerId === state.data.potWinnerId) || (selected !== 'Bued' && playerId !== state.data.potWinnerId)
    }

    const isPlayerIn = () => {
        return state.data.players?.[playerId]?.isIn !== false
    }

    return (
        <RowContainer>
            <RadioButton disabled={!isPlayerIn()} id={playerId + 'Win'} label={'Win'} checked={selected === 'Win' && playerId === state.data.potWinnerId} onClick={(e) => handleNewPotWinner(e)}/>
            <RadioButton disabled={!isPlayerIn()} id={playerId + 'Safe'} label={'Safe'} checked={defaultToSafe()} onClick={(e) => handleSafe(e)}/>
            <RadioButton disabled={!isPlayerIn()} id={playerId + 'Bued'} label={'Bued'} checked={selected === "Bued"} onClick={(e) => handleBued(e)}/>
        </RowContainer>
    )
}
export default ResultRadioButtons
