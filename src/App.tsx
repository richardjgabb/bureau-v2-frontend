import { BrowserRouter, Route, Routes } from "react-router-dom"
import WelcomePage from "./pages/WelcomePage"
import GamePage from "./pages/GamePage/GamePage"
import PlayersPage from "./pages/PlayersPage/PlayersPage"
import PlayerPage from "./pages/PlayerPage/PlayerPage"
import NavBar from "./components/Molecules/NavBar/NavBar"
import StatsPage from "./pages/StatsPage/StatsPage"

function App() {

  return (
    <div className={"min-h-screen bg-black/90 p-2 transition-all duration-2000"}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/stats" element={<StatsPage />}></Route>
          <Route path="/games/:gameId" element={<GamePage />}></Route>
          <Route path="/players" element={<PlayersPage />}></Route>
          <Route path="/players/:playerId" element={<PlayerPage />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
