import React, { useEffect, useState, useMemo } from 'react'
import { CRYPTO_PAGE_TITLE, PLACEHOLDER } from '../../constant/constant'
import { Input, message } from 'antd'
import { Table } from 'antd'
import { type SearchProps } from 'antd/es/input'
import { useAppDispatch } from '../../hooks/ReduxHooks'
import { setGlobalLoader } from '../../store/slice/CommonSlice'
import { ICurrencyDataType } from '../../types'
import { getCryptoCurrency } from './api'
import { formatNumber } from '../../utils/utils'
import './Currency.scss'
import { useNavigate } from 'react-router-dom'
const { Search } = Input
const Currency = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [listData, setListData] = useState<ICurrencyDataType[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    void handleGetCryptoCurrency()
    const intervalId = setInterval(() => {
      void handleGetCryptoCurrency()
    }, 60000)

    return () => clearInterval(intervalId)
  }, [search])

  const handleGetCryptoCurrency = async () => {
    dispatch(setGlobalLoader(true))
    const response = await getCryptoCurrency(search)
    if (response?.status === 200) {
      setListData(response?.data?.data)
    }
    dispatch(setGlobalLoader(false))
  }

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearch(value.trim().toLowerCase())
  }

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'priceUsd',
        key: 'priceUsd',
        render: formatNumber,
      },
      {
        title: '24h vol',
        dataIndex: 'changePercent24Hr',
        key: 'changePercent24Hr',
        render: formatNumber,
      },
      {
        title: 'Market Capitalization',
        dataIndex: 'marketCapUsd',
        key: 'marketCapUsd',
        render: formatNumber,
      },
    ],
    []
  )

  const handleRowClick = (record: ICurrencyDataType) => {
    navigate(`/crypto-details/${record.id}`)
  }

  const memoizedListData = useMemo(() => listData, [listData])

  return (
    <div className="crypto-wrapper">
      <div className="flex items-center p-6 crypto-title">
        <span className="desktop-head-h3 font-extra-bold flex-1 text-left">{CRYPTO_PAGE_TITLE}</span>{' '}
        <Search placeholder={PLACEHOLDER.search} onSearch={onSearch} allowClear className="flex-1 flex justify-end custom-searchbar searchbar" />
      </div>
      <div className="pr-6 pl-6 cryptp-table" style={{ height: 'auto' }}>
        <Table<ICurrencyDataType>
          columns={columns}
          dataSource={memoizedListData}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>
    </div>
  )
}

export default Currency
