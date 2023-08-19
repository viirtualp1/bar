export interface DrinkData {
  id: number
  name: string
  image?: String
  price: number
  location: String[]
  discount?: number
  description?: String
  density?: number
  strength?: number
}

export interface SnackData {
  id: number
  name: String
  image?: String
  price: number
  location: number[]
  discount?: number
}
