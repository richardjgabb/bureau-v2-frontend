import { BrowserRouter, Route, Routes } from "react-router-dom"
import GamePage from "./pages/GamePage/GamePage"
import PlayersPage from "./pages/PlayersPage/PlayersPage"
import PlayerPage from "./pages/PlayerPage/PlayerPage"
import StatsPage from "./pages/StatsPage/StatsPage"
import GamesPage from "./pages/GamesPage"
import HomePage from "./pages/HomePage"
import { BureauProvider } from "./Context/BureauProvider"
import { AuthProvider } from "./Context/AuthContext"
import ProtectedRoute from "./components/Atoms/ProtectedRoute"
import LoginPage from "./pages/LoginPage/LoginPage"

function App() {

  return (
    <div className={"min-h-screen bg-black/90 p-2 transition-all duration-2000 pb-4"}>
      <AuthProvider>
      <BureauProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/games" element={<GamesPage />}></Route>
              <Route path="/stats" element={<StatsPage />}></Route>
              <Route path="/games/:gameId" element={<GamePage />}></Route>
              <Route path="/players" element={<PlayersPage />}></Route>
              <Route path="/players/:playerId" element={<PlayerPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </BureauProvider>
      </AuthProvider>
    </div>
  )
}

export default App
