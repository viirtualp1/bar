export type ProductType =
  | 'Drink'
  | 'Snack'
  | 'Food'
  | 'Discount'
  | 'Services'
  | 'Boules'
  | 'Bottle'

export enum ProductEnum {
  DRINK = 'Drink',
  SNACK = 'Snack',
  FOOD = 'Food',
  DISCOUNT = 'Discount',
  SERVICES = 'Services',
  BOULES = 'Boules',
  BOTTLE = 'Bottle',
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
}

export type DrinkData = ProductData & {
  type: ProductEnum.DRINK
  priceLittleSize: number
  priceBigSize: number
  density?: number
  strength?: number
}

export type BoulesDrink = ProductData & {
  type: ProductEnum.BOULES
  priceLittleSize: number
  priceBigSize: number
  density?: number
  strength?: number
}

export type BottleDrink = ProductData & {
  type: ProductEnum.BOTTLE
  priceLittleSize: number
  priceBigSize: number
  density?: number
  strength?: number
}

export type SnackData = ProductData & {
  type: ProductEnum.SNACK
  price: number
}

export type FoodData = ProductData & {
  type: ProductEnum.FOOD
  price: number
}

export type DiscountData = ProductData & {
  type: ProductEnum.DISCOUNT
  price: number
}

export type ServiceData = ProductData & {
  type: ProductEnum.SERVICES
  price: number
}
