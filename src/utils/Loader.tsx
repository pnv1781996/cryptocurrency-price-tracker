import React from 'react'
import { Spin } from 'antd'
import { useAppSelector } from '../hooks/ReduxHooks'

const Loader = () => {
  const loader = useAppSelector((state) => state.common.globalLoader)
  return (
    <>
      {loader && (
        <>
          <Spin fullscreen size="large" />
        </>
      )}
    </>
  )
}

export default Loader
