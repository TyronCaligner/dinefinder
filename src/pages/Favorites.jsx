
import { Link } from 'react-router-dom'
import { foodItems } from '../data/foodData'

export default function Favorites({ favorites, onToggleFavorite }) {
  const favoriteFoods = foodItems.filter((food) =>
    favorites.some((favorite) => favorite.foodItemId === food.id)
  )

  return (
    <section className="min-h-[70vh] bg-orange-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-semibold text-orange-600">YOUR COLLECTION</p>

        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
          Favorite Dishes
        </h1>

        <p className="mt-3 text-gray-600">
          Your favorite meals, all in one place.
        </p>

        {favoriteFoods.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-orange-100 bg-white p-10 text-center shadow-sm">
            <p className="text-6xl">🤍</p>

            <h2 className="mt-5 text-2xl font-bold">
              No favorites yet
            </h2>

            <p className="mt-3 text-gray-600">
              Explore the menu and tap the heart on a dish you love.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700"
            >
              Explore Food
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-8 text-sm text-gray-500">
              {favoriteFoods.length} saved dish
              {favoriteFoods.length === 1 ? '' : 'es'}
            </p>

            <div className="mt-5 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteFoods.map((food) => (
                <article
                  key={food.id}
                  className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                      {food.category}
                    </span>

                    <h2 className="mt-3 text-xl font-bold">
                      {food.name}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {food.description}
                    </p>

                    <p className="mt-4 text-xl font-extrabold text-orange-600">
                      ₱{food.price}
                    </p>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(food.id)}
                      className="mt-4 w-full rounded-xl border border-red-200 px-4 py-3 font-bold text-red-600 transition hover:bg-red-50"
                    >
                      ❤️ Remove from Favorites
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
