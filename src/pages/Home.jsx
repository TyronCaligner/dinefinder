
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-5 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            Discover your next favorite meal
          </p>

          <h1 className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Good food.
            <span className="block text-orange-600">
              Great discoveries.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Explore delicious dishes, discover restaurants, and find
            something worth craving today.
          </p>

          <Link
            to="/explore"
            className="mt-8 inline-block rounded-full bg-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-700"
          >
            Find Your Next Meal →
          </Link>
        </div>

        <div className="flex min-h-72 items-center justify-center rounded-3xl bg-orange-100 p-8">
          <div className="text-center">
            <div className="text-8xl">🍔 🍕</div>
            <p className="mt-5 text-xl font-bold text-orange-800">
              Something delicious awaits.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <p className="font-semibold text-orange-600">MADE FOR FOOD LOVERS</p>
        <h2 className="mt-2 text-3xl font-extrabold">
          Your next craving is waiting.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Browse different dishes, search your favorites, and discover
          delicious meals with DineFinder.
        </p>

        <Link
          to="/explore"
          className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
        >
          Explore the Menu
        </Link>
      </section>
    </>
  )
}
