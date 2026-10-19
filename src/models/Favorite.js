
export default class Favorite {
  constructor(id, foodItemId, dateAdded = new Date()) {
    this.id = id
    this.foodItemId = foodItemId
    this.dateAdded = dateAdded
  }

  getDetails() {
    return {
      id: this.id,
      foodItemId: this.foodItemId,
      dateAdded: this.dateAdded,
    }
  }
}
