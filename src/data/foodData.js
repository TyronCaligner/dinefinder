
import FoodItem from '../models/FoodItem'
import Restaurant from '../models/Restaurant'

export const restaurants = [
  new Restaurant(
    1,
    'Burger House',
    'Juicy burgers made fresh every day.',
    'Cebu City',
    4.8,
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  ),
  new Restaurant(
    2,
    'Pizza Corner',
    'Freshly baked pizza with delicious toppings.',
    'Cebu City',
    4.7,
    'https://images.unsplash.com/photo- pizza-placeholder'
  ),
  new Restaurant(
    3,
    'Sweet Treats',
    'Desserts for every craving.',
    'Cebu City',
    4.9,
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  ),
]

export const foodItems = [
  new FoodItem(
    1,
    'Classic Cheeseburger',
    'Grilled beef, melted cheese, fresh lettuce, and special sauce.',
    149,
    'Burgers',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    1
  ),
  new FoodItem(
    2,
    'Pepperoni Pizza',
    'Cheesy pizza topped with pepperoni and rich tomato sauce.',
    249,
    'Pizza',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    2
  ),
  new FoodItem(
    3,
    'Chicken Adobo',
    'Filipino-style chicken braised in soy sauce, vinegar, and spices.',
    179,
    'Filipino',
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    1
  ),
  new FoodItem(
    4,
    'Japanese Ramen',
    'Warm noodles served in a flavorful broth.',
    229,
    'Japanese',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    2
  ),
  new FoodItem(
    5,
    'Chocolate Donut',
    'A soft donut covered in rich chocolate glaze.',
    69,
    'Desserts',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',
    3
  ),
  new FoodItem(
    6,
    'Double Beef Burger',
    'Two beef patties with cheese and fresh vegetables.',
    199,
    'Burgers',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    1
  ),
]
