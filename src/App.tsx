import React, { Suspense } from 'react'
import './App.css'
import AppRoutes from './routes/routes'
import Loader from './utils/Loader'

function App() {
  return (
    <div className="content">
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </div>
  )
}

export default App
