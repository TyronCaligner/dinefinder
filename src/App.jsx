
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
} from 'react-router-dom'

import Home from './pages/Home'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Favorite from './models/Favorite'

function AppContent() {
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('dinefinder-favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dinefinder-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem(
      'dinefinder-favorites',
      JSON.stringify(favorites)
    )
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('dinefinder-cart', JSON.stringify(cart))
  }, [cart])

  function toggleFavorite(foodId) {
    setFavorites((current) => {
      const exists = current.some(
        (favorite) => favorite.foodItemId === foodId
      )

      if (exists) {
        return current.filter(
          (favorite) => favorite.foodItemId !== foodId
        )
      }

      return [...current, new Favorite(Date.now(), foodId)]
    })
  }

  function addToCart(foodId) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.foodItemId === foodId
      )

      if (existing) {
        return current.map((item) =>
          item.foodItemId === foodId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...current, { foodItemId: foodId, quantity: 1 }]
    })
  }

  function updateCartQuantity(foodId, quantity) {
    if (quantity < 1) {
      removeFromCart(foodId)
      return
    }

    setCart((current) =>
      current.map((item) =>
        item.foodItemId === foodId
          ? { ...item, quantity }
          : item
      )
    )
  }

  function removeFromCart(foodId) {
    setCart((current) =>
      current.filter((item) => item.foodItemId !== foodId)
    )
  }

  function placeOrder(order) {
    setLastOrder(order)
    setCart([])
    navigate('/order-confirmation', { replace: true })
  }

  const navClass = ({ isActive }) =>
    `font-medium transition hover:text-orange-600 ${
      isActive ? 'text-orange-600' : 'text-gray-700'
    }`

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900">
      <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="text-xl font-extrabold text-orange-600 sm:text-2xl"
          >
            DineFinder<span className="text-gray-900">.</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/explore" className={navClass}>
              Explore
            </NavLink>

            <NavLink to="/favorites" className={navClass}>
              Favorites ({favorites.length})
            </NavLink>

            <NavLink to="/cart" className={navClass}>
              Cart ({cartCount})
            </NavLink>
          </div>
        </nav>
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
                onAddToCart={addToCart}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                onPlaceOrder={placeOrder}
              />
            }
          />

          <Route
            path="/order-confirmation"
            element={
              lastOrder ? (
                <section className="mx-auto min-h-[70vh] max-w-3xl px-4 py-16 text-center">
                  <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-12">
                    <p className="text-6xl">🎉</p>

                    <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                      Order placed successfully!
                    </h1>

                    <p className="mt-4 text-gray-600">
                      Thank you, {lastOrder.fullName}! Your demo order has been recorded on this page.
                    </p>

                    <div className="mt-8 rounded-2xl bg-orange-50 p-6 text-left">
                      <p className="text-sm text-gray-500">
                        Demo order number
                      </p>
                      <p className="mt-1 text-xl font-extrabold">
                        {lastOrder.orderNumber}
                      </p>

                      <div className="mt-5 space-y-3">
                        {lastOrder.items.map((item) => (
                          <div
                            key={item.foodItemId}
                            className="flex justify-between gap-3"
                          >
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-semibold">
                              ₱{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 border-t border-orange-200 pt-4">
                        <div className="flex justify-between gap-3 font-extrabold">
                          <span>Total</span>
                          <span className="text-orange-600">
                            ₱{lastOrder.total.toFixed(2)}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-gray-600">
                          Payment: {lastOrder.paymentMethod}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Delivery address: {lastOrder.address}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-gray-500">
                      This is a demonstration only. No restaurant receives this order and no payment is processed.
                    </p>

                    <Link
                      to="/explore"
                      className="mt-7 inline-block rounded-xl bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
                    >
                      Continue Exploring
                    </Link>
                  </div>
                </section>
              ) : (
                <section className="mx-auto min-h-[70vh] max-w-3xl px-4 py-20 text-center">
                  <h1 className="text-3xl font-extrabold">
                    No recent order found
                  </h1>
                  <Link
                    to="/explore"
                    className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-bold text-white"
                  >
                    Explore Food
                  </Link>
                </section>
              )
            }
          />

          <Route
            path="*"
            element={
              <section className="mx-auto max-w-7xl px-4 py-20 text-center">
                <h1 className="text-4xl font-extrabold">
                  404 - Page Not Found
                </h1>
                <p className="mt-3 text-gray-600">
                  Sorry, we couldn't find that page.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
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
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
