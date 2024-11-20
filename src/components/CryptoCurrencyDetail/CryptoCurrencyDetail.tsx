import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/ReduxHooks'
import { setGlobalLoader } from '../../store/slice/CommonSlice'
import { fetchCryptoDetails, fetchCryptoDetailsForChart } from './api'
import { Empty } from 'antd'
import './CryptoCurrencyDetail.scss'
import { formatNumber } from '../../utils/utils'
import ChartComp from '../Chart/ChartComp'
const CryptoCurrencyDetail = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const [cryptoData, setCryptoData] = useState<any>(null)
  const [chartData, setChartData] = useState<any>()

  useEffect(() => {
    if (id) {
      handleFetchCryptoDetails(id)
      handleFetchCryptoDetailsForChart(id)

      const intervalId = setInterval(() => {
        handleFetchCryptoDetails(id)
        handleFetchCryptoDetailsForChart(id)
      }, 60000)
      return () => clearInterval(intervalId)
    }
  }, [id])

  const handleFetchCryptoDetails = async (fetchId: string) => {
    dispatch(setGlobalLoader(true))
    const response = await fetchCryptoDetails(fetchId)
    if (response?.status === 200) {
      setCryptoData(response?.data?.data)
    }
    dispatch(setGlobalLoader(false))
  }

  const handleFetchCryptoDetailsForChart = async (fetchId: string) => {
    dispatch(setGlobalLoader(true))
    const response = await fetchCryptoDetailsForChart(fetchId)
    if (response?.status === 200) {
      setChartData(response?.data?.data)
    }
    dispatch(setGlobalLoader(false))
  }

  return (
    <div className="deatail-wrapper h-full">
      <span className="desktop-head-h3 font-bold text-center mtb-4">{`About ${cryptoData?.name ?? id}`}</span>
      {cryptoData ? (
        <div className="deatils flex gap-4">
          <div className="indivdiual-details border-grey border-radius-8 flex flex-col gap-2 p-4 w-20">
            <span className="desktop-head-h3 font-semi-bold">
              {cryptoData.name}{' '}
              <span className="desktop-head-h5">
                <sub>{cryptoData.symbol}</sub>
              </span>
            </span>
            <span className="para-p2 font-semi-bold">$ {formatNumber(cryptoData.priceUsd)}</span>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-2 p-2 border-light-grey border-radius-8 ">
                <span className="para-p2 font-semi-bold">Volume</span>
                <span>{formatNumber(cryptoData.volumeUsd24Hr)}</span>
              </div>
              <div className="flex flex-col gap-2 p-2 border-light-grey border-radius-8 ">
                <span className="para-p2 font-semi-bold">Circulating Supply</span>
                <span>{formatNumber(cryptoData.supply)}</span>
              </div>
              <div className="flex flex-col gap-2 p-2 border-light-grey border-radius-8 ">
                <span className="para-p2 font-semi-bold">Market Rank</span>
                <span> {formatNumber(cryptoData.rank)}</span>
              </div>
            </div>
          </div>
          <div className="chart-detail w-80">
            <span className="desktop-head-h5 font-semi-bold">{cryptoData.name}</span>
            <ChartComp data={chartData ? chartData : []} />
          </div>
        </div>
      ) : (
        <div className="h-100vh flex items-center justify-center">
          <Empty />
        </div>
      )}
    </div>
  )
}

export default CryptoCurrencyDetail
