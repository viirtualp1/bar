export type ProductType = 'Drink' | 'Snack'

export enum ProductEnum {
  DRINK = 'Drink',
  SNACK = 'Snack',
}

export interface DrinkData {
  id: number
  name: string
  images: string[]
  price: number
  location: number[]
  discount?: number
  description?: string
  density?: number
  strength?: number
}

export interface SnackData {
  id: number
  name: string
  images: string[]
  description: string
  price: number
  location: number[]
  discount?: number
}
