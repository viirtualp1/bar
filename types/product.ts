export enum CategoriesType {
  DRINK = 'drink',
  BOULES = 'boules',
  BOTTLE = 'bottle',
  FOOD = 'food',
  SNACK = 'snack',
  DISCOUNT = 'discount',
  SERVICES = 'services',
}

export interface PriceData {
  small: number
  big: number
  default: number
}

export interface ProductData {
  id: string
  name: string
  images: string[]
  description?: string
  discount?: number
  locations: number[]
  types: string[]
  inStock: boolean
  price: PriceData
}

export interface DrinkData extends ProductData {
  density?: number
  strength?: number
}

export interface BeerData extends DrinkData {
  type: CategoriesType.DRINK
}

export interface BoulesDrink extends DrinkData {
  type: CategoriesType.BOULES
}

export interface BottleDrink extends DrinkData {
  type: CategoriesType.BOTTLE
}

export interface SnackData extends ProductData {
  type: CategoriesType.SNACK
}

export interface FoodData extends ProductData {
  type: CategoriesType.FOOD
}

export interface DiscountData extends ProductData {
  type: CategoriesType.DISCOUNT
}

export interface ServiceData extends ProductData {
  type: CategoriesType.SERVICES
}
