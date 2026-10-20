
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { foodItems } from '../data/foodData'

export default function Checkout({ cart = [], onPlaceOrder }) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery',
  })

  const [errors, setErrors] = useState({})

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

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
      newErrors.phone = 'Enter a valid contact number.'
    }

    if (!form.address.trim()) {
      newErrors.address = 'Please enter your delivery address.'
    }

    if (cartItems.length === 0) {
      newErrors.cart = 'Your cart is empty.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    onPlaceOrder?.({
      ...form,
      items: cartItems.map((item) => ({
        foodItemId: item.foodItemId,
        name: item.food.name,
        price: item.food.price,
        quantity: item.quantity,
      })),
      total,
      orderNumber: `DF${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
    })
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto min-h-[70vh] max-w-3xl px-4 py-20 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-5 text-3xl font-extrabold">
          Your cart is empty
        </h1>
        <p className="mt-3 text-gray-600">
          Add some delicious food before checking out.
        </p>
        <Link
          to="/explore"
          className="mt-7 inline-block rounded-xl bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
        >
          Explore Food
        </Link>
      </section>
    )
  }

  return (
    <section className="min-h-[70vh] bg-orange-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-orange-600">
          ALMOST THERE
        </p>

        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Checkout
        </h1>

        <p className="mt-3 text-gray-600">
          Enter your delivery details to review your order.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"
          noValidate
        >
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">
              Delivery Information
            </h2>

            <label className="mt-6 block font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName}
              </p>
            )}

            <label className="mt-5 block font-semibold" htmlFor="phone">
              Contact Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              placeholder="e.g. 09XX XXX XXXX"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone}
              </p>
            )}

            <label className="mt-5 block font-semibold" htmlFor="address">
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              autoComplete="street-address"
              rows={3}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              placeholder="House number, street, barangay, city"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address}
              </p>
            )}

            <label className="mt-5 block font-semibold" htmlFor="paymentMethod">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              <option>Cash on Delivery</option>
              <option>GCash (Demo Only)</option>
            </select>

            <p className="mt-3 text-sm text-gray-500">
              This is a school project demo. No real payment will be processed.
            </p>

            {errors.cart && (
              <p className="mt-3 text-sm text-red-600">
                {errors.cart}
              </p>
            )}
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">
              {cartItems.map(({ food, quantity, foodItemId }) => (
                <div
                  key={foodItemId}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">{food.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {quantity}
                    </p>
                  </div>

                  <span className="whitespace-nowrap font-semibold">
                    ₱{(food.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-5">
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div className="mt-4 flex justify-between gap-3 text-lg font-extrabold">
                <span>Total</span>
                <span className="text-orange-600">
                  ₱{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-orange-600 px-5 py-3.5 font-bold text-white transition hover:bg-orange-700"
            >
              Place Demo Order
            </button>

            <Link
              to="/cart"
              className="mt-4 block text-center font-semibold text-orange-600 hover:text-orange-700"
            >
              ← Back to Cart
            </Link>
          </aside>
        </form>
      </div>
    </section>
  )
}
