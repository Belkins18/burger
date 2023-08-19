export type TExchangeData = TExchangeItem[]
export type TProductData = TProductItem[]

export type TExchangeItem = {
  symbol: string
  token: string
  rate?: number
}
export type TProductItem =  {
  image: string
  title: string
  text: string
  basePrice: number
  price: string | number
  grams: number
}