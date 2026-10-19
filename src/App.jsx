
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import Favorite from './models/Favorite'

function App() {
  const [favorites, setFavorites] = useState(() => {
  try {
    const savedFavorites = localStorage.getItem('dinefinder-favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  } catch {
    return []
  }
})

useEffect(() => {
  localStorage.setItem('dinefinder-favorites', JSON.stringify(favorites))
}, [favorites])

  function toggleFavorite(foodId) {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (favorite) => favorite.foodItemId === foodId
      )

      if (exists) {
        return currentFavorites.filter(
          (favorite) => favorite.foodItemId !== foodId
        )
      }

      return [...currentFavorites, new Favorite(Date.now(), foodId)]
    })
  }

  const navClass = ({ isActive }) =>
    `font-medium transition hover:text-orange-600 ${
      isActive ? 'text-orange-600' : 'text-gray-700'
    }`

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-orange-50 text-gray-900">
        <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <Link
              to="/"
              className="text-xl font-extrabold text-orange-600 sm:text-2xl"
            >
              DineFinder<span className="text-gray-900">.</span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-6">
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>

              <NavLink to="/explore" className={navClass}>
                Explore
              </NavLink>

              <NavLink to="/favorites" className={navClass}>
                Favorites ({favorites.length})
              </NavLink>
            </div>          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/explore"
              element={
                <Explore
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />

            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />

            <Route
              path="*"
              element={
                <section className="px-6 py-24 text-center">
                  <h1 className="text-4xl font-extrabold">404</h1>
                  <p className="mt-3 text-gray-600">
                    Sorry, that page could not be found.
                  </p>
                  <Link
                    to="/"
                    className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
                  >
                    Back to Home
                  </Link>
                </section>
              }
            />
          </Routes>
        </main>

        <footer className="border-t border-orange-100 bg-white px-6 py-6 text-center text-sm text-gray-500">
          © 2026 DineFinder. Made for food lovers.
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
