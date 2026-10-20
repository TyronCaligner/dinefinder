
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { foodItems, restaurants } from '../data/foodData'

const categories = [
  'All',
  'Burgers',
  'Pizza',
  'Filipino',
  'Japanese',
  'Desserts',
]

export default function Explore({
  favorites = [],
  onToggleFavorite,
  onAddToCart,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [addedFoodId, setAddedFoodId] = useState(null)

  const filteredFoods = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    return foodItems.filter((food) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        food.category === selectedCategory

      const matchesSearch =
        food.name.toLowerCase().includes(search) ||
        food.description.toLowerCase().includes(search)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  function handleAddToCart(foodId) {
    onAddToCart?.(foodId)
    setAddedFoodId(foodId)

    window.setTimeout(() => {
      setAddedFoodId((currentId) =>
        currentId === foodId ? null : currentId
      )
    }, 1500)
  }

  return (
    <section className="min-h-[70vh] bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-semibold text-orange-600">
          EXPLORE OUR MENU
        </p>

        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
          What are you craving?
        </h1>

        <p className="mt-3 text-gray-500">
          Discover delicious dishes and save the ones you love.
        </p>

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for a dish..."
          aria-label="Search food"
          className="mt-8 w-full rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 md:max-w-md"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 font-semibold transition ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-50 text-gray-700 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing {filteredFoods.length} dish
            {filteredFoods.length === 1 ? '' : 'es'}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/favorites"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              ❤️ Favorites ({favorites.length})
            </Link>

            <Link
              to="/cart"
              className="rounded-xl bg-orange-600 px-4 py-2.5 font-bold text-white transition hover:bg-orange-700"
            >
              🛒 View Cart
            </Link>
          </div>
        </div>

        {filteredFoods.length > 0 ? (
          <div className="mt-5 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFoods.map((food) => {
              const restaurant = restaurants.find(
                (item) => item.id === food.restaurantId
              )

              const isFavorite = favorites.some(
                (favorite) => favorite.foodItemId === food.id
              )

              const wasAdded = addedFoodId === food.id

              return (
                <article
                  key={food.id}
                  className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      loading="lazy"
                      className="h-52 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => onToggleFavorite?.(food.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${food.name} from favorites`
                          : `Add ${food.name} to favorites`
                      }
                      aria-pressed={isFavorite}
                      className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-xl shadow transition hover:scale-110"
                    >
                      {isFavorite ? '❤️' : '🤍'}
                    </button>

                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-orange-700">
                      {food.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold">
                      {food.name}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {food.description}
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      📍 {restaurant?.name ?? 'Local restaurant'}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-xl font-extrabold text-orange-600">
                        ₱{food.price}
                      </span>

                      <button
                        type="button"
                        onClick={() => onToggleFavorite?.(food.id)}
                        className="rounded-xl bg-orange-50 px-3 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
                      >
                        {isFavorite ? 'Saved ❤️' : 'Save Favorite'}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(food.id)}
                      className={`mt-4 w-full rounded-xl px-5 py-3 font-bold text-white transition ${
                        wasAdded
                          ? 'bg-green-600'
                          : 'bg-orange-600 hover:bg-orange-700'
                      }`}
                    >
                      {wasAdded ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-orange-50 p-10 text-center">
            <p className="text-4xl">🍽️</p>

            <h2 className="mt-4 text-xl font-bold">
              No dishes found
            </h2>

            <p className="mt-2 text-gray-600">
              Try another search or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="mt-5 rounded-full bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
