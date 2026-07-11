import { BrowserRouter, Route, Routes } from "react-router-dom"
import GamePage from "./pages/GamePage/GamePage"
import PlayersPage from "./pages/PlayersPage/PlayersPage"
import PlayerPage from "./pages/PlayerPage/PlayerPage"
import NavBar from "./components/Molecules/NavBar/NavBar"
import StatsPage from "./pages/StatsPage/StatsPage"
import GamesPage from "./pages/GamesPage"
import HomePage from "./pages/HomePage"
import { BureauProvider } from "./Context/BureauProvider"

function App() {

  return (
    <div className={"min-h-screen bg-black/90 p-2 transition-all duration-2000 pb-4"}>
      <BureauProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/games" element={<GamesPage />}></Route>
              <Route path="/stats" element={<StatsPage />}></Route>
              <Route path="/games/:gameId" element={<GamePage />}></Route>
              <Route path="/players" element={<PlayersPage />}></Route>
              <Route path="/players/:playerId" element={<PlayerPage />}></Route>
          </Routes>
        </BrowserRouter>
      </BureauProvider>
    </div>
  )
}

export default App
