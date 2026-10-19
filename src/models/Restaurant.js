
export default class Restaurant {
  constructor(id, name, description, address, rating, image) {
    this.id = id
    this.name = name
    this.description = description
    this.address = address
    this.rating = rating
    this.image = image
  }

  getDetails() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      address: this.address,
      rating: this.rating,
      image: this.image,
    }
  }
}
