
import { Link } from 'react-router-dom'
import { foodItems } from '../data/foodData'

function Cart({ cart = [], onUpdateQuantity, onRemoveItem }) {
  const cartItems = cart
    .map((item) => {
      const food = foodItems.find(
        (food) => food.id === item.foodItemId
      )

      return food ? { ...item, food } : null
    })
    .filter(Boolean)

  const total = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  )

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">
        Your Shopping Cart
      </h1>
      <p className="mt-2 text-gray-600">
        Review your meals before checkout.
      </p>

      {cartItems.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold">Your cart is empty.</p>
          <p className="mt-2 text-gray-500">
            Find something delicious to add!
          </p>
          <Link
            to="/explore"
            className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
          >
            Explore Food
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {cartItems.map(({ food, quantity, foodItemId }) => (
              <article
                key={foodItemId}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-28 w-full rounded-xl object-cover sm:w-32"
                />

                <div className="flex-1">
                  <h2 className="font-bold">{food.name}</h2>
                  <p className="mt-1 text-orange-600 font-bold">
                    ₱{food.price.toFixed(2)}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() =>
                        onUpdateQuantity(foodItemId, quantity - 1)
                      }
                      className="rounded-lg border px-3 py-1"
                      aria-label={`Decrease ${food.name} quantity`}
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() =>
                        onUpdateQuantity(foodItemId, quantity + 1)
                      }
                      className="rounded-lg border px-3 py-1"
                      aria-label={`Increase ${food.name} quantity`}
                    >
                      +
                    </button>

                    <button
                      onClick={() => onRemoveItem(foodItemId)}
                      className="ml-auto text-sm font-semibold text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="mt-5 flex justify-between gap-3">
              <span className="text-gray-600">Subtotal</span>
              <span>₱{total.toFixed(2)}</span>
            </div>

            <div className="mt-3 flex justify-between gap-3">
              <span className="text-gray-600">Delivery</span>
              <span>Free</span>
            </div>

            <div className="mt-5 border-t pt-4">
              <div className="flex justify-between gap-3 font-extrabold">
                <span>Total</span>
                <span className="text-orange-600">
                  ₱{total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 block rounded-xl bg-orange-600 px-5 py-3 text-center font-bold text-white hover:bg-orange-700"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
