
export default class FoodItem {
  constructor(id, name, description, price, category, image, restaurantId) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.category = category
    this.image = image
    this.restaurantId = restaurantId
  }

  getDetails() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      image: this.image,
      restaurantId: this.restaurantId,
    }
  }
}
