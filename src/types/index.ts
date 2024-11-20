export interface ICurrencyDataType {
  id: string
  name: string
  priceUsd: number
  changePercent24Hr: number
  marketCapUsd: number
}

export interface IDataPoint {
  priceUsd: string
  time: number
  date: string
}

export interface IGraphProps {
  data: IDataPoint[]
}
