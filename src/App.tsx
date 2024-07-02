import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home-page/HomePage'
import AppHeader from './components/app-header/AppHeader'
import FavoritesPage from './pages/favorites-page/FavoritesPage'
import PokemonDetails from './pages/detailed-page/PokemonDetails'

function App() {

  return (
    <Router>
      <main>
        <AppHeader />
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<FavoritesPage />}path='/favorites' />
          <Route element={<PokemonDetails />}path='/pokemon/:pokemonId' />
        </Routes>
      </main>
    </Router>
  )
}

export default App
