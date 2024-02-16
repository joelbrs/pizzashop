export interface RestaurantDTOOut {
  id: string
  name: string
  description: any
  managerId: string
  createdAt: string
  updatedAt: string
}

export interface RestaurantDTOIn {
  email: string
  managerName: string
  phone: string
  restaurantName: string
}
