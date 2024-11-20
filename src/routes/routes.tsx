// builtin
import React from 'react'
import Currency from '../pages/currency/Currency'
import { Navigate, Route, Routes } from 'react-router-dom'
import CryptoCurrencyDetail from '../components/CryptoCurrencyDetail/CryptoCurrencyDetail'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Currency />} />
      <Route path="/crypto-details/:id" element={<CryptoCurrencyDetail />} />
      {/* page not found */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
