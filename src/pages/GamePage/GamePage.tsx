import { GameProvider } from "./GameContext.tsx"
import GameSection from "./GameSection.tsx"

const GamePage = () => {

    return (
        <GameProvider>
            <GameSection />
        </GameProvider>
    )
}
export default GamePage
