import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../Store'

const initialState = {
  globalLoader: false,
}

export const commonSlice = createSlice({
  name: 'commonData',
  initialState,
  reducers: {
    setGlobalLoader: (state, action) => {
      state.globalLoader = action.payload
    },
  },
})

export const { setGlobalLoader } = commonSlice.actions

export const selectCommon = (state: RootState) => state.common

export default commonSlice.reducer
